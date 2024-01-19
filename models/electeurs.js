const mongoose= require("mongoose");

const electorSchema=mongoose.Schema({
    firstName :{
        type:String,
        required: [true,'Please give the firsname'],
        minLength:3
    },
    secondName :{
        type:String,
        required: [true,'Please give the firsname']
    },
    nationalIdentityNumber:{
        type:Number,
        required: [true, 'Please give the national identifical number'],
        // unique: true,
    },
    voterNumber:{
        type:Number,
        required: [true, 'Please give the national identifical number'],
        // unique: true,
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Please give the date of birth']
    },
    placeOfBirth:{
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