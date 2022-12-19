var express=require("express");
var router=express.Router();
// custom imports
const {isSignedin,isAuthenticated}=require("../controllers/auth");
const { createSurvey,getSurveyById,addquestionsSurvey, getSurvey, takeSurvey, getSpecificSurvey, getAllSurvey, getMySurvey } = require("../controllers/survey");
const {getUserById}=require("../controllers/user")

router.param("userId",getUserById);
router.param("surveyId",getSurveyById);
// creates a new survey by user
router.post("/survey/create/:userId",isSignedin,isAuthenticated,createSurvey);
// add questions to the survey
router.post("/survey/addquestions/:surveyId",addquestionsSurvey);
// survey x taken by user y
router.post("/survey/:surveyId/takenby/:userId",isSignedin,isAuthenticated,takeSurvey);
// get a  specific survey
router.get("/survey/:surveyId",getSurvey);
// get specific survey by specific user
router.get("/survey/:surveyId/takenby/:userId",isSignedin,isAuthenticated,getSpecificSurvey)
// get all surveys
router.get("/surveys",getAllSurvey)


module.exports=router;