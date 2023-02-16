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

 ### Clients and Servers
 - Criando um local server
 server.js
 ~~~javascript
 const http = require('http');
const server = http.createServer((req, res) =>{
    console.log('request foi feito');
});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

 bash
 ~~~javascript
 node server.js
 ~~~
- Vai ficar esperando um request


#### Request and Response
 ~~~javascript
 const http = require('http');
const server = http.createServer((req, res) =>{
    console.log('request foi feito');
    console.log(req)
    console.log(req.url)
    console.log(req.method)


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~
 - set header content type
 ~~~javascript
 const http = require('http');
const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/plain');
    res.write('ola, mundo');
    res.end();
});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

##### returning HTML pages
 ~~~javascript
 const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    //send html 
    fs.readFile('./views/index.html', (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            
            res.write(data);
            res.end();
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

- alternativa do código acima
 ~~~javascript
 const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    //send html 
    fs.readFile('./views/index.html', (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

#### Basic Routing
 ~~~javascript
 const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break
        default:
            path += '404.html';
            break
    }
    //send html 
    fs.readFile(path, (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~


#### Status codes
    - 200 ok
    - 301 Resource moved
    - 404 Not found
    - 500 Internal server error
 ~~~javascript
 const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break
        default:
            path += '404.html';
            res.statusCode = 404;
            break
    }
    //send html 
    fs.readFile(path, (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

#### Redirects
 ~~~javascript
 const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break
        default:
            path += '404.html';
            res.statusCode = 404;
            break
    }
    //send html 
    fs.readFile(path, (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~

##### nodemon para não ficar ter que cancelando o processo a toda alteração
 ~~~bash
 npm install nodemon
 npm install -g nodemon #instalaria globalmente

 node node_modules/nodemon/bin/nodemon.js server
 ~~~

##### npm
- Para criar o package.json
- Organizar dependências, scripts e outras informações
 ~~~bash
 npm init
 ~~~

- lodash tem várias funções interessantes, olhar depois
~~~javascript
 npm install lodash
 ~~~
 ~~~javascript
 const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) =>{
    console.log('request foi feito');
    //ladash
    const num = _.random(3, 20);
    console.log(num);

    const greet = _.once(() =>{
        console.log('heloo');
    });
    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break
        default:
            path += '404.html';
            res.statusCode = 404;
            break
    }
    //send html 
    fs.readFile(path, (err, data)=>{
        if(err){
            
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000')
})
 ~~~


 
#### Dependecies
 - vai instalar as dependências
 ~~~bash
 npm install
 ~~~

## Express
- Manager routing, requests, logic....
 ~~~bash
 npm install express
 node node_modules/nodemon/bin/nodemon.js app
 ~~~

app.js
 ~~~javascript
 const express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);//retorna uma instância do server se quiser armazenar num var para usar depois

app.get('/', (req, res)=>{
    res.send('<p> oioioi page</p>');//identifica o content automaticamente
});
 ~~~

##### routing and HTML
 ~~~javascript
 const express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);//retorna uma instância do server se quiser armazenar num var para usar depois

app.get('/', (req, res)=>{
    // res.send('<p> oioioi page</p>');//identifica o content automaticamente
    res.sendFile('./views/index.html', {root: __dirname});//não é um caminho relativo é absoluto, por isso o segundo parâmetro
});


app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: __dirname});//não é um caminho relativo é absoluto, por isso o segundo parâmetro

});


app.get('/qualquercoisa', (req, res)=>{
    res.send('<p> oioioi page</p>');//identifica o content automaticamente
});
 ~~~

#### app.use() res.redirect()
 ~~~javascript
 const express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);//retorna uma instância do server se quiser armazenar num var para usar depois

app.get('/', (req, res)=>{
    // res.send('<p> oioioi page</p>');//identifica o content automaticamente
    res.sendFile('./views/index.html', {root: __dirname});//não é um caminho relativo é absoluto, por isso o segundo parâmetro
});


app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: __dirname});//não é um caminho relativo é absoluto, por isso o segundo parâmetro

});


//redirect
app.get('/about-us', (req, res) =>{
    res.redirect('/about');
})

//404 page
//precisa ficar no fim
app.use((req, res) =>{
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})
 ~~~


#### View engines
- ejs
- EJS templates are processed though the EJS view engine on the server

###### render e passando objetos para view
 ~~~javascript
 const express = require('express');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');
//app.set('views', 'myviews'); caso as views não fossem colocadas numa pasta chamada views

//listen for requests
app.listen(3000);//retorna uma instância do server se quiser armazenar num var para usar depois

app.get('/', (req, res)=>{
    const blogs = [
        {title: 'A cada dia da hora', snippet: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        {title: 'A cada dia da hora', snippet: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
        {title: 'A cada dia da hora', snippet: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'}
    ];
    res.render('index', {title: 'home', blogs});// passando um dado para a view
});


app.get('/about', (req, res)=>{
    res.render('about', {title: 'about'})
});


app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'create'});
})


app.use((req, res) =>{
    res.status(404).render('404', {title: '404'})
})
 ~~~

###### .ejs
 ~~~javascript
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>blog | <%= title %></title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>blog ninja</h1></a>
            <p>A net ninja site</p>
        </div>
        <ul>
            <li><a href="/">blog</a></li>
            <li><a href="/about">about</a></li>
            <li><a href="/blogs/create">new blog</a></li>
        </ul>
    </nav>
    <div class="blogs content">
        <h2>All blogs</h2>
        <% if (blogs.length > 0) { %>
            <% blogs.forEach(blog => { %>
            
                <h3><%=blog.title %></h3>
                <p><%=blog.snippet %></p>
            
            <% }); %>
        <% } else { %>
            <p>Vazio</p>
            <% } %>
    </div>
</body>
</html>
 ~~~

###### partials
 ~~~javascript
 <!DOCTYPE html>
<html lang="en">
    <%- include('./partials/head.ejs') %>

<body>
    <%- include('./partials/nav.ejs') %>


    <div class="about content">
        <h1>not found</h1>

    </div>

    <%- include('./partials/footer.ejs') %>
</body>
</html>
 ~~~

#### Middleware
##### .next() .use()
- Any code which runs on the server between getting a request and sending a response
- Logger middleware to log details of every request
- Authentication check middleware for protected routes
- Middleware to parse JSON data from requests
- Return 404 pages
 ~~~javascript
 const express = require('express');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');
//app.set('views', 'myviews'); caso as views não fossem colocadas numa pasta chamada views

//listen for requests
app.listen(3003);//retorna uma instância do server se quiser armazenar num var para usar depois

app.use((req, res, next) =>{
    console.log('New request made: ');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next(); //para sair daqui e ir pro próximo tentando reconhecer o path
});

app.get('/', (req, res)=>{
    const blogs = [
        {title: 'A cada dia da hora', snippet: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        {title: 'A cada dia da hora', snippet: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
        {title: 'A cada dia da hora', snippet: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'}
    ];
    res.render('index', {title: 'home', blogs});// passando um dado para a view
});


app.get('/about', (req, res)=>{
    res.render('about', {title: 'about'})
});


app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'create'});
})


app.use((req, res) =>{
    res.status(404).render('404', {title: '404'})
})
 ~~~

##### 3dr party middleware
- instalar
 ~~~bash
 npm install morgan
 ~~~

 ~~~javascript
const morgan = require('morgan');
app.use(morgan('dev'));
 ~~~

##### static files
- define um diretório para poder ser acessado
 ~~~javascript
app.use(express.static('public'));
 
 ~~~

##### Mongodb
- Mongoose
    - is an ODM library object document mapping library
    - Schemas defines the structure of a type of data/document
        - Properties and property types
    - Models allow us to communicate with database collections
 ~~~bash
  npm install mongoose
 ~~~

 - Criando um Schema
 ~~~javascript
 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
 ~~~

- basic on how to interact with the database
 ~~~javascript
 // mongoose and ong sandbox routes
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'tesxteowjfaosiefjoasejfoajojfoasidjfoiasj'
    });

    blog.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
        console.log('erro no save')
    })
})


app.get('/all-blogs', (req, res)=>{
    Blog.find()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err)
        console.log('erro no find')
    })
})


app.get('/single-blog', (req, res) =>{
    Blog.findById('63e02c5fd9081135f4650645')
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err)
        console.log('erro no findby id')
    })
})
 ~~~

##### Outputting documents in views
 ~~~javascript
 app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err)
        })
});
 ~~~

###### Request types
- GET requests to get a resource
- POST requests to create new data
- DLETE requests to pelete data
- PUT requests to update data
###### post
 ~~~javascript
app.use(express.urlencoded({extended: true}));

 app.post('/blogs', (req, res) =>{
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err, 'Erro para criar um blog')
        })
})
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