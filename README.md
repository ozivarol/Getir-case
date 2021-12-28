# Getir-case 🟡🟣


## Overview

A RESTful API with a single endpoint that retrieves data from the given MongoDB collection, filters it, and returns the results in the desired format.


## Table of contents
* [Installation](#installation)
* [API Document](#api-document)
* [Error Meanings](#error-meanings)
* [Live Demo](#live-demo)


## Installation
Clone repository
```
$ git clone https://github.com/ozivarol/Getir-case
```
Install dependencies
```
cd Getir-case

npm install
```

## Running

```
$ node app.js

or

$ nodemon npm start
```
Your app should now be running on [localhost:4040](http://localhost:4040/).



## API Document
Available endpoints in application
- GET `/api`
  - Expected Parameters<br>
      \-
  - Response <br>
      Endpoint responds with json
      ```json
      {
        "message": "Hello, welcome to Getir case"
      }
      ```

- POST `/api/filter`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      - *startDate* and *endDate* properties should be in date format
      - *startDate* should be older than *endDate*
      - *minCount* and *maxCount* properties should be a number
      - *maxCount* should be greater than *minCount*
      ```json
     {
        "startDate": "2016-04-26", 
        "endDate": "2016-05-27", 
        "minCount":2700, 
        "maxCount":3000
     }
      ```
  - Response <br>
   Filtered answers from Endpoint return in json format.
    ```json
              {
               "code": 0,
               "msg": "Success",
               "records": [
                   {
                       "key": "xKTZIiIb",
                       "createdAt": "2016-05-18T09:30:12.447Z",
                       "totalCount": 2849
                   },
                   {
                       "key": "xKTZIiIb",
                       "createdAt": "2016-05-18T09:30:12.447Z",
                       "totalCount": 2849
                   },
                   {
                       "key": "nfzwhnJm",
                       "createdAt": "2016-05-15T23:21:00.153Z",
                       "totalCount": 2719
                   },
                   {
                       "key": "udZfCkvB",
                       "createdAt": "2016-05-15T00:36:34.126Z",
                       "totalCount": 2701
                   }
               ]
           }
    ```
    
## Error Meanings
Application always responds in json. In this json, *code* property's value has meanings. These are;
| Code Value  | Meaning    |
| :---        |    :----:  |
| 1           |  An error has occurred in the system.|
| 2           | One or more values are missing, please check the entered values.(startDate,endDate,minCount,maxCount).|
| 3           |  Syntax is wrong.|
| 4           |  You entered an incorrect parameter. Please make sure startDate and endDate are in the format (YYYY-MM-DD), remember that minCount and maxCount are numbers.|
| 5           |  No such endpoint found, please check.|
| 6           |  Start date cannot be later than today.|
| 7           |  End date must be today or earlier.|
| 8           |  Max count and min count must be number values.|
| 9           |  Max count must be greater than min count.|
| 10          | Max count and min count cannot be less than zero.|

## Live Demo
Application running in the cloud with Heroku. <br>
endpoint of the API is 'api/filter' <br>
Click and play with it!
<a href="https://getir-case-oguzhan-varol.herokuapp.com/api" target="blank"><img align="center" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/heroku_logo_icon_169035.png" alt="oguzhnavarol" height="75" width="200" /></a>
