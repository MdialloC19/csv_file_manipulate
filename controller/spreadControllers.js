const Electeur=require('../models/electeurs');
const {isValidObjectId}=require('mongoose');

// data={
//         'id':1,
//         'name':'Moussa',
//         'nickName':'Diallo',
//         'date:':new Date(),
//         'lieu de naissance':' Mbour',
//         'NIN':10003454007,
//         'NE':88889999,
//         'lieu de vote': 'Mbour',
//  }
exports.getAllSpreadRows =async (req,res)=>{
   
    try {
        
        const electeurs=await Electeur.find();
        if(!electeurs){
            return res.status(404).json({
            succeed: true,
            message:'Data not found'
            });
        }
        res.status(200).json({
            succeed: true,
            message:electeurs
        });
        
    } catch (error) {
        res.status(500).json({
            succed:false,
            error: 'Sommething went Wrong!!!'
        });
        console.log(error);
    }
    
}

exports.getOneSpreadRows =async (req,res)=>{
     const spreadId= req.params.id;
    try {
        if(!isValidObjectId(req.params.id)){
            return res.status(400).json({
            succed:false,
            error: 'Invalid Id'
        });
        }
        const electeurs=await Electeur.findById(spreadId);
        if(!electeurs){
            res.status(404).json({
            succeed: true,
            message:'Data not found'
            });
        }
        res.status(200).json({
            succeed: true,
            message:electeurs
        });
        
    } catch (error) {
        res.status(500).json({
            succed:false,
            error: 'Sommething went Wrong!!!'
        });
        console.log(error);
    }
    
}

exports.postOnSpread = async (req, res) => {
    const perso = {};
    const requiredFields = [
        'firstName', 'secondName', 'nationalIdentityNumber',
        'voterNumber', 'dateOfBirth', 'placeOfBrith',
        'votingPlace'
    ];

    let isMissingField = false;
    console.log(req.body);

    requiredFields.forEach((field) => {
        if (req.body[field]) {
            perso[field] = req.body[field];
        } else {
            isMissingField = true;
            return res.status(400).json({
                success: false,
                error: `${field} is required.`
            });
        }
    });

    // if (isMissingField) {
    //     // Don't proceed further if any required field is missing
    //     return;
    // }

    const electorInstance = new Electeur(perso); // Note: Changed from 'Elector' to 'Electeur'

    try {
        await electorInstance.validate();

        console.log("Data is valid.");

        await electorInstance.save();

        return res.status(201).json({
            success: true,
            message: 'Data saved successfully.'
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            // Handle validation error
            return res.status(400).json({
                success: false,
                error: 'Validation error.',
            });
        } else {
            // Handle other errors
            return res.status(500).json({
                success: false,
                error: 'Error while saving data to the database.',
            });
        }
    }
};

exports.putOnSpread=(req,res)=>{

}

