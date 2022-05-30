# Feature Flag API Test

This repo contains the files required to run a simple feature flag API.

The goal is to create an endpoint which shows what users are allowed to use features based on if they fufill the criteria set within the `features.json` file.

# Plan

In order to develop this API i aim to split up the development within 5 steps in order to complete it within 3 hours.
    - Research into feature flags and the based way to handle the issue.
    - Build a basic express application before building the API and functions
    - Building functions inorder to see if a user fufills the criteria
    - Building Tests and Testing using JEST

# Assumptions
First assumption is this ... 
 -  **The feature flags returned by the API for a given user must always be consistent**
        - This in my eyes means that while server is running the user must always be allowed to access a certain feature that is set
        - So storing the information in a database would be preffered as the *ratio/odds* for a user could change
  - a basic HTML page is required as the aim is to see what features a **given** user has activated therefore a simple page could be used to display the API 
  - Within features the included countries means only those countries are supported and likewise for excluded
  - Last assumption the api needs to return this value for a **given** user in this format
  ```
                {
                    "email":"foo@bar.com",
                    "location":"GB" ,
                    "features": "feature_foo"
                }
```
