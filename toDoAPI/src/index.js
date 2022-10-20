const express = require("express");
const {v4 : uuidv4} = require("uuid");

const app = express();
app.use(express.json());

const users = [];

function cheackIfUserExists(request, response, next) {
    const {username} = request.headers;
    const user = users.find(user=>user.username === username);

    if(!user)    
        return response.status(404).json({error:"User not found"});

    request.user = user;

    return next();
}

function cheackIfTodoExists(request, response, next) {
    const {user} = request;
    const {id} = request.params;
    
    const todoIndex = user.todos.findIndex(todo=>todo.id === id);

    if(todoIndex < 0)
        return response.status(404).json({error: 'Todo not Found'});

    request.todoIndex = todoIndex;   

    return next();
}

app.post("/users",(request, response)=>{
    const {name, username} = request.body;

    const userExists = users.some(user=>user.username === username);
    
    if(userExists)
        return response.status(400).json({error:"User already exists"});
    
    const userData ={
        id: uuidv4(),
        name,
        username,
        todos:[]
    }

    users.push(userData);

    return response.status(201).send();
});

app.get("/todos",cheackIfUserExists,(request, response)=>{
    const {user} = request;

    return response.json(user.todos);
});

app.post("/todos",cheackIfUserExists,(request, response)=>{
    const {user} = request;
    const {title, deadline} = request.body;

    const todoData = {
        id: uuidv4(),
        title,
        deadline: new Date(deadline),
        done: false,
        create_at: new Date(),
    }

    user.todos.push(todoData);

    return response.status(201).send();
});

app.put("/todos/:id",cheackIfUserExists,cheackIfTodoExists,(request, response)=>{   
    const {title, deadline} = request.body;
    const {user, todoIndex} = request;

    user.todos[todoIndex] = {
        ...user.todos[todoIndex],
        title, 
        deadline: new Date(deadline)
    }

    return response.status(201).send();
});

app.patch("/todos/:id/done",cheackIfUserExists, cheackIfTodoExists,(request, response)=>{
    const {user, todoIndex} = request;
    
    user.todos[todoIndex] = {
        ...user.todos[todoIndex],
        done: true
    }

    return response.status(201).send();
});

app.delete("/todos/:id",cheackIfUserExists, cheackIfTodoExists,(request, response)=>{
    const {user, todoIndex} = request;
    
    user.todos.splice(todoIndex, 1);

    return response.status(204).send();
});

app.listen(5000);