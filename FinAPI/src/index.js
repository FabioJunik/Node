const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;
    
    const customer = customers.find(customer=>customer.cpf === cpf);
    
    if(!customer)
    return response.status(400).json({error: "Customer not found"});

    request.customer = customer;

    return next();
}

function getBalance(statement){
    
    const balance = statement.reduce((acc, {type, amount})=>{
        return type === "credit" ? acc + amount: acc - amount;
    },0);

    return balance;
}

app.post("/account",(request, response)=>{
    const {cpf, name} = request.body;

    const customerAlreadyExists = customers.some(customer=> customer.cpf === cpf);   

    if(customerAlreadyExists)
        return response.status(400).json({error:"Customer already exists!"});
    
    customers.push({
        id: uuidv4(),
        cpf,
        name,
        statement:[]
    });

    console.log(customers);

    return response.status(201).send()
});

app.get("/statement",verifyIfExistsAccountCPF,(request, response)=>{
    const {customer} = request;

    return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response)=>{
    const {description, amount} = request.body;
    const {customer} = request;

    const statementOperation ={
        description,
        amount,
        create_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const {amount} = request.body;
    const {customer} = request;
    const balance = getBalance(customer.statement);

    if(balance < amount)
        return response.status(400).json({error: "Insufficient funds!"});

    const statementOperation ={
        amount,
        create_at: new Date(),
        type: "debit"
    }
    
    customer.statement.push(statementOperation);
    
    return response.status(201).send();

})

app.get("/statement/date",verifyIfExistsAccountCPF,(request, response)=>{
    const {customer} = request;
    const {date} = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(({create_at})=> 
        create_at.toDateString() === new Date(dateFormat).toDateString()
    );

    return response.json(statement);
});

app.put("/account", verifyIfExistsAccountCPF, (request, response)=>{
    const {name} = request.body;
    const {customer} = request;

    customer.name = name;

    return response.status(201).send();
});

app.get("/account", verifyIfExistsAccountCPF, (request, response)=>{
    const {customer} = request;

    return response.json(customer);
});

app.delete("/account", verifyIfExistsAccountCPF, (request, response)=>{
    const {customer} = request;
    
    customers.splice(customer, 1);

    return response.status(200).json(customer);
});

app.get("/balance", verifyIfExistsAccountCPF, (request, response)=>{
    const {customer} = request;
    
    const balance = getBalance(customer.statement);

    return response.status(200).json(balance);
});

app.listen(5000);