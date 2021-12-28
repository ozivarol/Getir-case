const hs = require("http-status") 
const Error = {};



// This function is invoked for system errors
Error.sytemError = (res,error) => {
    res.status(hs.INTERNAL_SERVER_ERROR).json({
        code:1,
        msg:"An error has occurred in the system.",
    });

};
// This function is invoked in case of syntax error.For example ; invalid syntax of request body
Error.badRequest = (res,error) => {
    res.status(hs.BAD_REQUEST).json({
        code:3,
        msg:"Syntax is wrong."
    });

};
// This function is invoked if missing parameter is entered. 
Error.MissingParams = (res,error) => {
    res.status(hs.BAD_REQUEST).json({
        code:2,
        msg:
        "One or more values are missing, please check the entered values.(startDate,endDate,minCount,maxCount)."
    });
};
// This function is used for invalid request parameters.
Error.WrongParams = (res,error) => {
    res.status(hs.BAD_REQUEST).json({
        code:4,
        msg:"You entered an incorrect parameter. Please make sure startDate and endDate are in the format (YYYY-MM-DD), remember that minCount and maxCount are numbers."

    })
}
// This function is invoked on invalid endpoints.
Error.endPointNotFound = res => {
    res.status(hs.NOT_FOUND).json({
        code:5,
        msg:"No such endpoint found, please check."
    })
};
// Logically, the start date cannot be later than today's date.
Error.WrongStartDate = (res,error) => {
    res.status(hs.BAD_REQUEST).json({
        code:6,
        msg:"Start date cannot be later than today."
    })
}
//Logically the end date cannot be later than today's date.
Error.WrongEndDate = (res,error) =>{
    res.status(hs.BAD_REQUEST).json({
        code:7,
        msg:"End date must be today or earlier."
    })
}
// It should take max count and min count number
Error.WrongNumber = (res,err) => {
    res.status(hs.BAD_REQUEST).json({
        code:8,
        msg:"Max count and min count must be number values."
    })
}
// Logically, max count should be greater than min count.
Error.WrongValue = (res,err) => {
    res.status(hs.BAD_REQUEST).json({
        code:9,
        msg:"Max count must be greater than min count."
    })
}
//This function is invoked if max count and min count are given a value less than zero.
Error.WrongZero = (res,err) => {
    res.status(hs.BAD_REQUEST).json({
        code:10,
        msg:"Max count and min count cannot be less than zero"
    })
}

module.exports = Error;
