# Node.js
- Read and write files on a computer
- Connect to a database
- Act as a server for content
- Adds more features to JS

#### Conteúdo
 - Criar um servidor usando node para um website, como criar um Express app / website, como usar mongoDB, como usar template engines para criar HTML views, criar um blog no final.


##### Como executar um arquivo básico
 - teste.js
 ~~~javascript
 const name = 'carlos'
 console.log(name)
 ~~~

- No terminal:
    - não é necessário colocar a extensão .js
 ~~~bash
 node teste
 ~~~


### The Global object
- Parecido com o window object em um navegador.
- Ele é chamado 'global'
 ~~~javascript
 console.log(global)
 ~~~


 ~~~javascript
 <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 46.60161600261927,
      nodeStart: 0.22655799984931946,
      v8Start: 2.549526996910572,
      bootstrapComplete: 37.392365001142025,
      environment: 20.070032998919487,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1675204016574.143
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
 ~~~

- Colocando na tela uma msg de tempo em tempo e depois interrompendo
 ~~~javascript
 setTimeout(()=>{
    clearInterval(int);
    console.log('Interrompido');
}, 4000)

const int = setInterval(()=>{
    console.log('Dentro do intervalo')
}, 1000);
 ~~~

- Absolute path
- Absolute path com o nome do arquivo
 ~~~javascript
 console.log(__dirname);

 console.log(__filename);
 ~~~

#### Modules require
 - Com require o arquivo vai ser importado e executado
 - Mas ainda dá direito de acessar variáveis de um em outro
 - people.js
 ~~~javascript
 const people = ['calors', 'jose', 'joao', 'maria']
 ~~~

 - modules.js
 ~~~javascript
 const xzy = require('./people')
 ~~~

 ##### Para que tenha acesso as variáveis é preciso fazer um export
 ~~~javascript
 const people = ['calors', 'jose', 'joao', 'maria']
 module.exports = people
 ~~~

 - modules.js
 ~~~javascript
 // o require retorna um objeto que foi feito o export no outro arquivo
 const xzy = require('./people')
 console.log(xzy)
 ~~~

 ##### Para exportar mais de um objeto
 ~~~javascript
 const people = ['calors', 'jose', 'joao', 'maria']
 const ages = [2,33,12,45,21]
 module.exports = {
    people, ages
 }
 ~~~

 - modules.js
 ~~~javascript
 // o require retorna um objeto que foi feito o export no outro arquivo
 const xzy = require('./people')
 // agora isso aqui é um objeto com duas propriedade
 console.log(xzy)
 //Para ver cada um separado
 console.log(xzy.ages)
 console.log(xzy.people)

 ~~~


 ##### Uma alternativa mais simples na sintexa
 ~~~javascript
 const people = ['calors', 'jose', 'joao', 'maria']
 const ages = [2,33,12,45,21]
 module.exports = {
    people, ages
 }
 ~~~

 - modules.js
 ~~~javascript
 
 const {people, ages} = require('./people')
 
 console.log(ages)
 console.log(people)

 ~~~

 ###### built-in
 ~~~javascript
 const os = require('os');
 console.log(os)
 console.log(os.plataform())
 console.log(os.homedir())

 ~~~

#### File system
 ~~~javascript
 const fs = require('fs');

 // reading files
 fs.readFile('./docs/blog1.txt', (err, data) =>{
    if (err){
        console.log(err);
    }
    console.log(data)//buffer
    console.log(data.toString())//ver o conteudo

 })
 ~~~

 ~~~javascript
 const fs = require('fs');
 // write files
 fs.writeFile('./docs/blog1.txt', 'ola texto', () =>{
    console.log('file was written')
 })
 ~~~


 ~~~javascript
 const fs = require('fs');

 // directories

 fs.mkdir('./assests', (err) =>{
    if(err){
        console.log(err)
    }
    console.log('folder created');
 })
 ~~~

- fazendo a mesma coisa mas checando se já existe
 ~~~javascript
  const fs = require('fs');
 if (!fs.existsSync('./assts')){
        fs.mkdir('./assests', (err) =>{
            if(err){
                console.log(err)
            }
            console.log('folder created');
        })
 }
 else {
    fs.rmdir('./assets', (err) =>{
        if(err){
            console.log(err)
        }
        console.log('folder deleted')
    })
 }
 ~~~


 ~~~javascript
  const fs = require('fs');
 // delete files
 if (fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if (err){
            console.log(err)
        }
        console.log('file deleted')
    })
 }
 ~~~

#### Streams
- Start using data, before it has finished loading
#### read
 ~~~javascript
  const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
//on é um eventlistener
//vem pacotes de dados e toda vez que um pacote chega um evento existe
readStream.on('data', (chunck) =>{
    console.log('new chunck -------------------')
    console.log(chunck)

})
 ~~~

#### write
 ~~~javascript
 const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
//on é um eventlistener
//vem pacotes de dados e toda vez que um pacote chega um evento existe

const writeStream = fs.createWriteStream('./docs/blog4.txt', {encoding: 'utf8'});



readStream.on('data', (chunck) =>{
    console.log('new chunck -------------------')
    console.log(chunck)

    writeStream.write('\n New Chunk \n');
    writeStream.write(chunck);
})



 ~~~

#### pipe
 ~~~javascript
 const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});

const writeStream = fs.createWriteStream('./docs/blog4.txt', {encoding: 'utf8'});

readStream.pipe(writeStream)
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~

 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~


 ~~~javascript
 
 ~~~