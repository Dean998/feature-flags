//Importing all necessary dependencies
const express = require('express')
const path = require('path');

//importing database
const {startDatabase} = require('./db/mongo');
const {insertUser, getUsers} = require('./db/users');

//Importing example users and features 
const exampleUsers = require('../example_users.json')
const features = require('../features.json')

//Defining the express App
const app = express()

//empty arrays of features which will be filled with users that support the features 
let superCoolFeature = []
let marketingBanner = []
let simplifiedNavBar = []
let enhancedDashboardFeature = []
let newUserOnBoardingJourney = []

let allFeatures =[]
let selectedUser =[]


let user = {
    email : selectedUser,
    features : allFeatures
}

//Creating a function to see if criteria is fufilled
const checker= () => {
    //Creating a nested for loop to check if within a feature which users are supported

    for(let i = 0 ; i < features.length ; i++){
  
    //within each feature we then loop through all the different users to see if they are elegible  
    // console.log(users[i])
    for(let j = 0 ; j < exampleUsers.length; j++){
      //if email is included then these statements will run
      if(features[i].enabledEmails.includes(exampleUsers[j].email)){
        //running through each feature to see which users are enabled for each user and pushing to each respective feature
        //Super Cool Feature 
        if(features[i].name == "SuperCoolFeature")
        {superCoolFeature.push(exampleUsers[j])}
        //SimplifiedNavBar
        if(features[i].name == "SimplifiedNavBar")
        {simplifiedNavBar.push(exampleUsers[j])}
        //EnhancedDashboardFeature
        if(features[i].name == "EnhancedDashboardFeature")
        {enhancedDashboardFeature.push(exampleUsers[j])}
        //newUserOnBoardingJourney
        if(features[i].name == "NewUserOnboardingJourney")
        {newUserOnBoardingJourney.push(exampleUsers[j])}
      } 
        }
    }
    console.log("SuperCoolFeature" , superCoolFeature)
console.log("MarketingBanner" , marketingBanner)
console.log("SimplifiedNavBar" , simplifiedNavBar)
console.log("EnhancedDashboardFeature" , enhancedDashboardFeature)
console.log("NewUserOnboardingJourney" , newUserOnBoardingJourney)

}

checker()

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