const hs = require("http-status")
const Record = require("../Model/recordModel");
const ApiError = require("../helpers/errorHandling")


// Finds the desired records according to the given parameters

const filter = (req,res) => {
    const {startDate , endDate , minCount , maxCount} = req.body //Aggregating query with parameters
    Record.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        }, {
            $project: {
                key: 1,
                _id: 0,
                createdAt: 1,
                totalCount: {
                    $sum: '$counts'
                }
            }
        }, 
        
        {
            $match: {    //filtering data
                totalCount: {
                    $gt: parseInt(minCount),
                    $lt: parseInt(maxCount)
                }
            }
        }
    ])
    .exec()
    .then(data => {
        res.status(hs.OK).json({
            code:0,
            msg:"Success",
            records:data
        });
    })
    .catch(e =>{
        ApiError.sytemError(res,e); //If an error is caught, error handling works
    });

}

//the function is exported
module.exports = {
    filter,
}