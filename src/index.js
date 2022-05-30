console.log('Hello World')
//Importing all necessary dependencies
const express = require('express')

//Defining the express App
const app = express()
//Allows the use of other files for get requests
const path = require('path');


//Importing example users for a quick test 
const exampleUsers = require('../example_users.json')
const features = require('../features.json')

//contains all the users within the json
const user = exampleUsers

//gets the main index.html page which will lead everywhere else
app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

//gets the page when the server runs and displays the users
app.get('/users' , (req,res) => {
    res.send(user)
})
//gets the page when the server runs and displays the features
app.get('/features' , (req,res) => {
    res.send(features)
})


//which port the app will use 
app.listen(3001, () => {
    console.log('listening on port 3001')
})