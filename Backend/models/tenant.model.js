const mongoose = require("mongoose")


const tenantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    plan:{
        type:String,
        enum:["free","pro"],
        default:"free"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
});


module.exports = mongoose.model("Tenant",tenantSchema);