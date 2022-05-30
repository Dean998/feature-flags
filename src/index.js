//Importing all necessary dependencies
const express = require('express')
const path = require('path');
const ejs = require('ejs')

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
//This array will carry all of the features a set user has on their account 
let allFeatures =[]
//Change this value to the user you would like to see - can even be typed in as a string like this..
// instead of exampleUsers[0].email it can be "tom@example.com"
let selectedUser = exampleUsers[0].email


let user = {
    email : selectedUser,
    features : allFeatures
}

//this function gets which user you are and runs through for loops to see if they are included in the features and pushes it to the array allFeatures
const fufilled = () => {  

    checker()  
      
    for(let i = 0 ; i < superCoolFeature.length ; i++){
      if(selectedUser.includes(superCoolFeature[i].email))
      {allFeatures.push("SuperCoolFeature")}
    }
    for(let i = 0 ; i < simplifiedNavBar.length ; i++){
      if(selectedUser.includes(simplifiedNavBar[i].email))
      {allFeatures.push("Simplified NavBar")}
    }
    
    for(let i = 0 ; i < marketingBanner.length ; i++){
      if(selectedUser.includes(marketingBanner[i].email))
      {allFeatures.push("Marketing Banner")}
    }
    
    for(let i = 0 ; i < enhancedDashboardFeature.length ; i++){
      if(selectedUser.includes(enhancedDashboardFeature[i].email))
      {allFeatures.push("Enhanced Dashboard Banner")}
    }
    
    for(let i = 0 ; i < newUserOnBoardingJourney.length ; i++){
      if(selectedUser.includes(newUserOnBoardingJourney[i].email))
      {allFeatures.push("NewUserOnboarding Banner")}
    }

}




//Creating a function to see if criteria is fufilled
const checker= () => {
//Creating a nested for loop to check if within a feature which users are supported
    for(let i = 0 ; i < features.length ; i++){
    //within each feature we then loop through all the different users to see if they are elegible  
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
            //extra section for enhanced dashboard and newuseronboarding based on odds and location

    if(features[i].name == 'EnhancedDashboardFeature' && Math.random() > 0.5 && features[i].includedCountries.includes(exampleUsers[j].location))
    {enhancedDashboardFeature.push(exampleUsers[j]) }

    //newuseronboarding based on odds and location
    if(features[i].name == 'NewUserOnboardingJourney' && Math.random() < 0.25 && !features[i].excludedCountries.includes(exampleUsers[j].location) && exampleUsers[j].email.includes(newUserOnBoardingJourney) )
    {newUserOnBoardingJourney.push(exampleUsers[j]) }

    //Assuming marketing banner is the only one that doesnt matter in terms of ratio as only those in the country can use it plus ratio is 1 so guarenteed for US citizens to see it 
    //Marketing Banner
    if(exampleUsers[j].location.includes(features[i].includedCountries) && features[i].name == "MarketingBanner")
      {marketingBanner.push(exampleUsers[j])}
        }
    }
    //these console logs contain all of the users that are supported within each feature
// console.log("SuperCoolFeature" , superCoolFeature)
// console.log("MarketingBanner" , marketingBanner)
// console.log("SimplifiedNavBar" , simplifiedNavBar)
// console.log("EnhancedDashboardFeature" , enhancedDashboardFeature)
// console.log("NewUserOnboardingJourney" , newUserOnBoardingJourney)

}

fufilled()
//this console log shows what user it is and what features they have registered to their account 
console.log(user)


//gets the main index.html page which will lead everywhere else
app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html' ))
})


//gets the page when the server runs and displays the users
app.get('/users' , (req,res) => {
    res.send(user)
})
//gets the page when the server runs and displays the features
// app.get('/features' , (req,res) => {
//     res.send(features)
// })

//displaying the emails of users supported in all features
app.get('/features' , (req,res) => {
    res.send({'superCoolFeature' : superCoolFeature , "MarketingBanner" : marketingBanner , "SimplifiedNavBar" : simplifiedNavBar ,
    "EnhancedDashboardFeature" : enhancedDashboardFeature,"NewUserOnboardingJourney" : newUserOnBoardingJourney })
})
 


//which port the app will use 
app.listen(3001, () => {
    console.log('listening on port 3001')
})

module.exports = app;
