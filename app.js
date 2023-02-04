const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');
//app.set('views', 'myviews'); caso as views não fossem colocadas numa pasta chamada views

//listen for requests
app.listen(3003);//retorna uma instância do server se quiser armazenar num var para usar depois


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