const mongoose= require("mongoose");

const electorSchema=mongoose.Schema({
    firstName :{
        type:String,
        required: [true,'Please give the firsname']
    },
    secondName :{
        type:String,
        required: [true,'Please give the firsname']
    },
    nationalIdentityNumber:{
        type:Number,
        required: [true, 'Please give the national identifical number']
    },
    voterNumber:{
        type:Number,
        required: [true, 'Please give the national identifical number']
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Please give the date of birth']
    },
    placeOfBrith:{
        type:String,
        required:[true,'Please give the city of birth']
    },
    votingPlace:{
        type:String,
        required:[true,'Please give the voting place']  
    }
});

// console.log(electorSchema);
module.exports=mongoose.model('Electeur', electorSchema);