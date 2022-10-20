// const http = require('http');
// const fs = require("fs");

const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

// 
    //  Node puro (sem o express)

//     const server = http.createServer((request, response)=>{
//     const url = request.url;

//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/html; charset=utf-8');


//     if(url === "/"){
//         fs.readFile("./_public/index.html",(err, content)=>{
//             if(err) throw err
//             response.end(content);
//         })
//     }

//     if(url === "/sobre"){
//         response.end('<h1>Page Sobre</h1>');
//     }
// })

// server.listen(PORT, hostname,()=>{
//     console.log(`Servidor rodando em http://${hostname}:${PORT}`);
// })

// Node com o express

const express = require('express');

const app = express();

const userLogined = true;

app.use('/bashboard',(request, response, next)=>{
    if(!userLogined)
        response.redirect('/restrited');
    
    next();
})

app.get("/", (request, response)=>{
    response.send("<h1>Pagina inicial</h1>");
});

app.get("/bashboard", (request, response)=>{
    response.send("<h1>Seja bem vindo de volta</h1>");
});

app.get("/bashboard/:username", (request, response)=>{
    const {username} = request.params;
    response.send("<h1>Seja bem vindo de volta "+username+"</h1>");
});

app.get('/restrited', (request, response)=>{
    response.send("<h1>Restricted page</h1>");
});

app.listen(PORT,hostname, ()=>console.log(`Server is running on port ${PORT}`));