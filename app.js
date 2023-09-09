const app=require("express")();
const bodyparser=require("body-parser");
const cookieparser=require("cookie-parser");


// custom imports
const connectDb=require("./config/db");
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const surveyRoutes=require("./routes/surveyRoutes")
connectDb();
const PORT=5000;

// middlewares
app.use(bodyparser.json());
app.use(cookieparser());

// routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",surveyRoutes);
app.get("/",(req,res)=>{
    console.log("Hello")
})
// app.use("/api",authRoutes);
app.listen(PORT,()=>{
    console.log("App is running");
})

