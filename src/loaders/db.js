const Moongose = require("mongoose");

const db = Moongose.connection


//Database connection.
const connectDB = async () =>{
    db.once("open",()=>{
        console.log("database connection successful..")
    
    })

    try {
        const con = await Moongose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
       
        console.log(`MongoDB connected : ${con.connection.host}`);
        
    } 
      
    catch (error) {
        console.log(error);
        
        
        
    }
}

module.exports = {
    connectDB,
}