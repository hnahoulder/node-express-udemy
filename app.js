const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const PORT = 3000;

app.use('/public', express.static('public')); //middleware pour utiliser les fichiers statiques (.css)

app.set('views', './views'); //déclaration du répertoire views
app.set('view engine', 'ejs')//view engine c'est EJS npm install ejs

var urlencodedParser = bodyParser.urlencoded({extend: false});

const secret  = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

app.use(expressJwt({secret:secret}).unless({path: ['/login', '/', '/movies', '/movie-search']})); // sauf le chemin login

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
    const id = req.params.id;

    // const title = 'Terminator';
    const title = req.params.title;
    // res.send(`Film numéro ${id}`);
    res.render('movie-details', {movieid: id});
});

app.get('/', (req, res) => {
    // res.send('Hello <b>world!</b>');
    res.render('index');
});

app.get('/movie-search', (req, res) =>{
    res.render('movie-search');
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Espace membre'});
});
const fakeUser = {email: 'testuser@testmail.fr', password: 'qsd'};

app.post('/login', urlencodedParser, (req, res) => {
    console.log('Login post: ', req.body);
if(!req.body){
    res.sendStatus(500);
} else{
    if(fakeUser.email === req.body.email && fakeUser.password === req.body.password){
        const  myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', role: 'admin'}, secret);
        res.json(myToken);
        /*res.json({
            email: 'testuser@testmail.fr',
            favoriteMovie: 'Il étati une fois dans l\'Ouest ',
            favoriteMovieTheater: 'Ciné TNB',
            lastLoginDate: new Date()
        });*/
    }else {
        res.sendStatus(401);
    }
}
});

app.get('/member-only', (req, res) => {
   console.log('req.user: ', req.user);
   res.send(req.user);
});

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});