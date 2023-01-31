const fs = require('fs');

 // reading files
 fs.readFile('./docs/blog1.txt', (err, data) =>{
    if (err){
        console.log(err);
    }
    console.log(data)//buffer
    console.log(data.toString())//ver o conteudo

 })

 fs.writeFile('./docs/blog1.txt', 'ola texto', () =>{
    console.log('file was written')
 })
