const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { add } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')
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
        console.log('deu erro na conexão com o banco, provavelmente foi a lista de ip permitidos')

    })

//register view engine

app.set('view engine', 'ejs');
//app.set('views', 'myviews'); caso as views não fossem colocadas numa pasta chamada views




//middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.redirect('/blogs')
});


app.get('/about', (req, res)=>{
    res.render('about', {title: 'about'})
});

//blog routes
app.use('/blogs', blogRoutes)


app.use((req, res) =>{
    res.status(404).render('404', {title: '404'})
})