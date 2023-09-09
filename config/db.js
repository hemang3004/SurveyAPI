const mongoose =require("mongoose")
// Database has access all permissions set

const connectDb= async ()=>{
    try{
        const connect=await mongoose.connect("mongodb+srv://Hemang3004:playpower@cluster1.ehghgiz.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
            
        });
        console.log("Conn success")
    }catch(error){
        console.log("Conn not success",error.message)
        process.exit()

    }
}
module.exports=connectDb
