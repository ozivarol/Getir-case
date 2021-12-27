const ApiError = require("../helpers/errorHandling");
const validator = require("validator")

//This function validates whether the incoming parameters are missing.
const checkParams  = (req,res,next) =>{
    if(!req.body.consturactor === Object && Object.keys(req.body).length>4) return ApiError.MissingParams(res)
    const check = req.body.startDate == undefined || req.body.endDate == undefined || req.body.minCount == undefined || req.body.maxCount == undefined;

    if(check){
        return ApiError.MissingParams(res);
    }
    next();

}

//Validates the types of the entered parameter.
const checkDataType = (req,res,next) => {
    const {startDate,endDate,minCount,maxCount} = req.body;

    const regexp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const checker = typeof startDate == "string" && startDate.match(regexp) && typeof endDate == "string" && endDate.match(regexp) && typeof minCount == "number" && typeof maxCount == "number";

    if(checker){
        next()

    }
    else ApiError.WrongParams(res);

    
    

}
//Validates the entered date parameters.
const checkDate = (req,res,next) => {
    const {startDate,endDate} = req.body;
    const now  = new Date().toISOString().slice(0,10);
    if(!validator.isBefore(startDate,now)){
        return ApiError.WrongStartDate(res)
    }
    else if(!(validator.isBefore(endDate, now) || validator.equals(endDate, now))){
        return ApiError.WrongEndDate(res)
        
    }
    else if(!validator.isAfter(endDate, startDate)){

        return ApiError.WrongEndDate(res)

    }
    else{
        next()
    }


}
//Validates the entered number parameters.
const checkNumber = (req,res,next) =>{
    const {minCount,maxCount} = req.body;
   
    if(!(+minCount < +maxCount)){
        return ApiError.WrongValue(res)
    }
    else if(!(0 <= +minCount && 0 < +maxCount)){
        return ApiError.WrongZero(res)
    }
    else{
        next();
    }
}

//Export functions
module.exports = {
    checkParams,
    checkDataType,
    checkDate,
    checkNumber,
}