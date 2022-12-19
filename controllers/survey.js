const Survey=require("../models/survey")
const User = require("../models/user");
// find survey
exports.getSurveyById =(req,res,next,id)=>{
    Survey.findById(id)
    .exec((err,survey)=>{
        if(err){
            return res.json({
                error:"No Survey"
            })
        }
        req.survey=survey;
        next();
    })
}
// create survey and add it in users surveylist
exports.createSurvey=(req,res)=>{
    const survey= new Survey(req.body);
    survey.user=req.profile._id;
    survey.save((err,surv)=>{
        if(err || !surv){
            console.log(err)
            return res.status(400).json({
                error:"Not able to save it"
            });
        }
        res.json({surv})
    })
 
    User.findOneAndUpdate(
        {_id:req.params.userId},
        {$push:{
           surveys: survey}
        },
        {new:true,useFindAndModify:false},
        (err,user)=>{
            
            if(err){
                
                return res.status(400).json({
                    error:"Update failed"
                })
            }
        }
    )
    
   
}
// add questions to a survey/Question comein form a array in request's body #here item
exports.addquestionsSurvey=(req,res)=>{
    let list=[];
    req.body.items.forEach(item=>{
        
        list.push({
            question:item.question,
        })
    })
    // console.log(id)
    console.log()
        Survey.findByIdAndUpdate(
            {_id:req.params.surveyId},
            {$push:{
                questions:list
            }},(err,surv)=>{
                if(err){
                    console.log(err)
                    return  res.status(400).json({
                        error:err
                    })
                }
                res.json(surv);
            }

        )
        // next();
       
}
// get a survey # has only questions
exports.getSurvey=(req,res)=>{
    Survey.findById(req.params.surveyId)
    .exec((err,survey)=>{
        if(err){
            return res.json({
                error:"No Survey"
            })
        }
        res.json(survey.questions)
    })
}
// handles survey submitted by user and adding the user and its response{comes in form of an array similar to adding questions}
//  it in takersList of a particular survey 
exports.takeSurvey=(req,res)=>{
    let list=[]
    req.body.forEach(item=>{
        
        list.push({
            _id:item._id,
            question:item.question,
            answer:item.answer,
        })
    })
    const update={$push:{takersList:{
        keyuser:req.params.userId,
        questions:list
    }}}
    Survey.findByIdAndUpdate({_id:req.params.surveyId},
        update,(err,survey)=>{
            if(err){
                console.log(err)
                    return  res.status(400).json({
                        error:err
                    })
            }
            res.json({survey})
        })
   
}
// return a specific survey taken by a user to see modified response
exports.getSpecificSurvey=(req,res)=>{
    let obj={}
    Survey.findById({_id:req.params.surveyId})
    .exec((err,survey)=>{
        if(err){
            console.log(err)
            return res.status(400).json({error:err})
        }

        survey.takersList.forEach((item)=>{

            if(item.key==req.param.userId){
                obj=item;
            }
        })
        res.json({obj})
    })
}
// return all surveys along with user name(the one who created it)
exports.getAllSurvey=(req,res)=>{
    Survey.find()
    .select("name")
    .populate("user","username ")
    
    .exec((err,survey)=>{
        
            if(err){
                return res.status(400).json({
                    error:"No survey found"
                })
            }
            res.json(survey)
    
    })
}
// Return names and id of the surveys created by user 
exports.getMySurvey=(req,res)=>{
    User.findById(req.params.userId)
    .select("surveys")
    .populate("surveys","name")
    .exec((err,user)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:"No surveys created"
            })
        }
        res.json(user)
    })
    
}