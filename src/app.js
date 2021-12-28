const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const cors = require("cors");
const ApiError = require("./helpers/errorHandling")
const {RecordRouters} = require("./routers")
const morgan = require("morgan");
const path = require("path");
const fs = require("fs")
config();
// config and loaders are called directly here.
loaders();


const app = express();

app.use(express.json()); //Json parser

app.use(
    express.urlencoded({   
        //Body parser
        extended:false,
    })
)

app.use(cors({
    methods:"*",
    origin:"*",

    
}));

const accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"})
app.use(morgan("combined", {stream:accessLogStream}))


app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNIG ${process.env.PORT}`);
    
    app.use("/api",RecordRouters) //Endpoint is defined for RecordRouters.
    app.get('/api', (req, res) => {
        res.json({
          message: "Hello, welcome to Getir case",
        });
    });
      //Catches the 404 error and sends it to error handling
    app.use((req, res, next) => {
        ApiError.endPointNotFound(res);
      });
      
      // Production error handler
      app.use((err, req, res, next) => {
        ApiError.badRequest(res, err);
      });
})


module.exports = app;