const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbUserCRUD','root','',{
    host: 'localhost',
    dialect: 'mysql',
    difene:{
        charset: 'utf8',
        collete: 'utf8_general_ci',
        timestamps: true 
    },
    logging: false
});

sequelize.authenticate().then(()=>{
    console.log('Conectado no banco com sucesso !')
}).catch((err)=>{
    console.log("Falha ao conectar "+err)
});

module.exports = {Sequelize, sequelize};