const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('express-handlebars');

const User = require('../models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('hbs',hbs.engine({
    extname: "hbs",
    defaultLayout: "main"
}));

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true
}))

function validateForm(request, response, next){
    const {salary} = request.body;
    const name = request.body.name.trim();
    const email = request.body.email.trim().toLowerCase();
    
    request.session.erros = false;

    const erros = [];

    if(salary < 30000)
        erros[0] =({message:"O salario tem que ser maior que 30 000 kz!"});

    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s-']+$/.test(name)){
        erros[0] =({message:"Nome inválido!"});
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        erros[0] =({message:"Email inválido!"});
    }

    if(!name || !email) {
        erros[0] =({message:"Preencha todos os campos!"});
    }

    if(erros.length){
        console.log(erros)
        request.session.erros = erros;
        request.session.success = false;
        return response.redirect('/');
    }

    request.userData = {name,email,salary};

    return next();
}

app.get('/', (request, response) => {
    const {erros} = request.session;
    const {success} = request.session;

    request.session.erros = '';
    request.session.success = '';

    if(erros){
        return response.render("index",{activedPageCad:true, erros}); 
    }

    return response.render("index",{activedPageCad:true, success}); 
});

app.post('/register',validateForm,(request, response) => {
    const {name, email, salary} = request.userData;

    User.create({name,email,salary}).then(()=>{
        request.session.success = true;
        return response.redirect('/');
    }).catch((err)=>{
        console.log(`Erro no cadastro : ${err}`)
    });
});

app.get('/users', (request, response) => {

    User.findAll().then((users)=>{
        if(users.length){
            const data = users.map(user=> user.toJSON());
            response.render("users",{activedPageUsers:true, showTable:true, data}); 
        }
            
        response.render("users",{activedPageUsers:true, showTable:false}); 
        
    }).catch((err)=>{
        console.log(`Houve um erro ao listar usuarios : ${err}`);
    })

});

app.get('/edit/:id', (request, response) => {
    const {id} = request.params;

    User.findByPk(id).then(({name, email, salary})=>{
        response.render("edit",{name,email,id, salary}); 
    }).catch((err)=>{
        console.log('Erro ao editar : '+err)
        response.render("edit",{error:true})
    });

});

app.post('/update', validateForm, (request, response)=>{
    const {id} = request.body;
    const {name, email, salary} = request.userData;
    
    User.update(
        {name,email,salary},
        {where:{id}})
        .then(()=>{
            return response.redirect('/users')
        }).catch((err)=>console.log(err));
});

app.get('/delete/:id', (request, response) => {
    const {id} = request.params;

    User.destroy({where:{id}}).then(()=>response.redirect('/users')).catch((err)=>console.log(err));
});

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});