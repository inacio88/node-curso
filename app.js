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