const { ObjectID } = require("bson");
const mongoose=require("mongoose");


surveySchema = new mongoose.Schema({
    // name of survey
    name:{
        type:String,
        
    },
    // questions of the survey
    questions:[{
        question:{
            type:String,
            required:true,
            
            trim:true,
        },
        answer:{
            type:Number,
            // true:1 false:0
            defalut:-1,
        }

}],
// who created the survey
    user:{
        type:ObjectID,
        ref:"User"
    },
// keyuser is the id of user who took the survey and items has its corresponding response
    takersList:[{
        keyuser:{
            type:ObjectID,
        ref:"User"
        },
        questions:[{
            question:{
                type:String,

            },
            answer:{
                type:Number,
            }
            
    }]
    }]
})

const Survey=mongoose.model("Survey",surveySchema)
module.exports=Survey;