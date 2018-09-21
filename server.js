// EXTERNAL DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client:'pg',
    connection:{
        host: '127.0.0.1',
        user:'',
        password:'',
        database:'smart-brain'
    }
});
// MY MODULES
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const root = require('./controllers/root');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Localhost is running on port ${process.env.PORT}`)
})



/*
 * API ENDPOINTS
 */

// GET REQUEST "/"
app.get("/", root.getAllUser(db));

// POST REQUEST "/signin"
app.post("/signin", signin.handleSignIn(db,bcrypt));

// POST REQUEST "/register"
app.post("/register", register.handleRegister(db,bcrypt));

// GET REQUEST "/profile/:id"
app.get("/profile/:id", profile.handleProfileGet(db));

// PUT REQUEST "/profile/"
app.put("/profile", profile.handleProfilePut(db));

// PUT REQUEST "/image"
app.put("/image", (req,res) => {image.handleImage(req,res,db)})

// POST REQUEST "/imageurl"
app.post("/imageurl", (req,res) => {image.handleApiCall(req,res)})
