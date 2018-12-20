const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

/* const PORT = process.env.PORT;
const localPORT = 3000; */

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'ivojurisic',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req,res) =>  { image.handleImage(req, res, db) })
app.post('/imageurl', (req,res) =>  { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${PORT}`);
})