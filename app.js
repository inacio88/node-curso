const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
//express app
const app = express();

//connect to mongodb
dbURI = 'mongodb+srv://inacio88:inacioZERO0@nodetuts.eooofhr.mongodb.net/node-tutorial?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to db')
        //listen for requests
        app.listen(3003);//retorna uma instância do server se quiser armazenar num var para usar depois
    })
    .catch((err) =>{ 
        console.log(err);
        console.log('deu erro')

    })

//register view engine

app.set('view engine', 'ejs');
//app.set('views', 'myviews'); caso as views não fossem colocadas numa pasta chamada views

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


//middleware static files
app.use(express.static('public'));
app.use(morgan('dev'))

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