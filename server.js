const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users : [
         
        {
            id:"123",
            name: "pantelis",
            email: "panteliselef@outlook.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id:"124",
            name: "Tanya",
            email: "tanya@outlook.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.listen(3000, () => {
    console.log("Localhost is running on port 3000")
})


app.get("/", (req,res)=> {
    res.json(database.users);
})


// POST REQUEST "/signin"
app.post("/signin", (req,res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json("success");
    }else {
        res.status(400).json("error logging in");
    }
})

// POST REQUEST "/register"
app.post("/register", (req,res)=> {
    const {email,name,password} = req.body;
    database.users.push({
        id:"125",
        name:  name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})


// GET REQUEST "/profile/:id"
app.get("/profile/:id", (req,res)=> {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found) {

        res.status(400).json("No such user");
    }
})

// PUT REQUEST "/image"
app.put("/image",(req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json("No such user");
    }
})
