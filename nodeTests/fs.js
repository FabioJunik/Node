
const fs = require("fs");

if(!fs.existsSync('./_public')){
    fs.mkdirSync('./_public', (err)=>{
        return err;
    });

    console.log("Pasta criada com sucesso !");
}else{
    console.log("Pasta criada com sucesso !");
}

// {recursive:true} --> Perimite eliminar uma pasta com todos os arquivos 

// if(fs.existsSync('./_publicRename')){
//     fs.rmdir('./_publicRename',{recursive:true},(err)=>{
//         return err;
//     });

//     console.log("Pasta apagado com sucesso!")
// }else{
//     console.log("Pasta '_public' não existe!")
// }

// if(fs.existsSync('./_public')){
//     fs.renameSync('./_public', './_publicRename', (err)=>{
//         return err;
//     });

//     console.log("Pasta renomeada com sucesso!")
// }else{
//     console.log("Pasta '_public' não existe!")
// }


// Manipulando arquivos

// Formas de criar arquivos

const path = './_public/testFile.txt';

fs.writeFile(path, "Conteúdo de textes\nMuito texte ",(err)=>{
    if(err) throw err;

    console.log("Arquivo criado com sucesso !");
});

fs.appendFile(path, "\n\nAdicionando mais texto",(err)=>{
    if(err) throw err;

    console.log("Conteúdo adicionado com sucesso!");
});

!fs.existsSync(path) || fs.rename(path,"./_public/testFileRename.txt",(err)=>{
    if(err) throw err;
    console.log("Arquivo renomeado com sucesso!");
})

fs.unlink("./_public/testFileRename.txt", (err)=>{
    if(err) throw err

    console.log("Arquivo deletado com sucesso!");
});