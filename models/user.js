const mongoose=require("mongoose");
const crypto=require("crypto");
const { v4 : uuidv4 } =require('uuid');

 userSchema = new mongoose.Schema({
    // storing encrypted password
    enc_password:{
        type:String,
    },
    // storing salt for encryption
    salt:{
        type:String,},
        // unique username(as given in task that username is unique so no need of emailid)
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    // array of surveys created by user
   surveys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Survey',
        }
    ],
    
    
    
    
})
    userSchema.methods= {
        
        // converting password to encrypted password
        securePassword: function(plainPassword)
        {
            
            if(!plainPassword)
            {
                
                 return "";}
            try{
                give_in_update=plainPassword; 
                return_pass= crypto.createHmac('sha256', this.salt)
                       .update(give_in_update)
                       .digest('hex');

                return return_pass
            }
            catch(err)
            {
                return "";
            }
        },
        authenticate: function(plainpassword)
        {
            return this.securePassword(plainpassword)===this.enc_password
        }
    }
    userSchema.virtual("password")
        .set(function(password)
        {
            this._password =password;
            this.salt=uuidv4();
            
            this.enc_password=this.securePassword(password);
            
        })
        .get(function()
        {
            return this._password;
        })

module.exports=mongoose.model("User",userSchema);