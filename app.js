const express = require('express');
const app = express();

const PORT = 3000;

app.use('/public', express.static('public')); //middleware pour utiliser les fichiers statiques (.css)

app.set('views', './views'); //déclaration du répertoire views
app.set('view engine', 'ejs')//view engine c'est EJS npm install ejs


app.get('/movies', (req, res) => {
    // res.send('Bientôt des films ici même');
    res.render('movies');
});

/*app.get('/movie-details', (req, res) => {
   res.render('movie-details');
});*/

app.get('/movies/add', (req, res) => {
    res.send(`Formule d'ajout ici`);
});

app.get('/movies/:id', (req, res) => {
    // const id = req.params.id;
    // res.send(`Film numéro ${id}`);
    res.render('movie-details');
});

app.get('/', (req, res) => {
    // res.send('Hello <b>world!</b>');
    res.render('index');
});

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});