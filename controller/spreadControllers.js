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

exports.postOneSpreadRow = async (req, res) => {
    const perso = {};
    const requiredFields = [
        'firstName', 'secondName', 'nationalIdentityNumber',
        'voterNumber', 'dateOfBirth', 'placeOfBrith',
        'votingPlace'
    ];

    let isMissingField = {
    value: false,
    "error": "Bad Request",
    "message": "Certaines données requises sont manquantes.",
    "missingFields":[
         
    ]
}
    console.log(req.body);
    requiredFields.forEach((field) => {
        if (!req.body[field] || req.body[field] === '') {
            isMissingField.value = true;
            isMissingField.missingFields.push(field);
        } else {
            perso[field] = req.body[field];
        }
    });
    if (isMissingField.value) {
        return res.status(400).json({
                success: false,
                isMissingField
            });
    }

    const electorInstance = new Electeur(perso); 

    try {
        await electorInstance.validate();

        await electorInstance.save();

        return res.status(201).json({
            success: true,
            message: 'Data saved successfully.'
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            
            return res.status(400).json({
                success: false,
                error: 'Validation error.',
            });
        } else {
            
            return res.status(500).json({
                success: false,
                error: 'Error while saving data to the database.',
            });
        }
    }
};

exports.putOneSpreadRow=async (req,res)=>{

    const spreadId= req.params.id;
        if (!isValidObjectId(spreadId)) {
            return res.status(400).json({
                succeed: false,
                error: 'Invalid Idea ID'
            });
        }
    const requiredFields = [
        'firstName', 'secondName', 'nationalIdentityNumber',
        'voterNumber', 'dateOfBirth', 'placeOfBrith',
        'votingPlace'
    ];

    let updateFields={}, isMissingField = {
        value: false,
        "error": "Bad Request",
        "message": "Certaines données requises sont manquantes.",
        "missingFields":[   
        ]
    }
    console.log(req.body);
    requiredFields.forEach((field) => {
        if (req.body[field] === '') {
            isMissingField.value = true;
            isMissingField.missingFields.push(field);
        } else {
            updateFields[field] = req.body[field];
        }
    });
    if (isMissingField.value) {
        return res.status(400).json({
                success: false,
                isMissingField
            });
    }

    try {
        const updatedPerso= await Electeur.findByIdAndUpdate(
            spreadId,updateFields, {new: false}
        );
        if (updatedPerso === null) {
                return res.status(404).json({
                    succeed: false, error: 'perso not found'
                });
        }
        res.status(200).json({
            succeed: true, data: updatedPerso
        }); 
    } catch (error) {
        res.status(500).json({
            succed:false,
            error:'Something went wrong'+ error.message
        });
        console.log(error);
    }
};

exports.deleteOneSpreadRow=async (req,res)=>{
    const spreadId= req.params.id;
        if (!isValidObjectId(spreadId)) {
            return res.status(400).json({
                succeed: false,
                error: 'Invalid spread ID'
            });
        }
    try {
        const perso=await Electeur.findById(spreadId);
        if(!perso){
            return res.json(404).json({
                succed:false,
                error: 'Row not found !!!'
            });
        }

        const deletedPerso=await Electeur.findByIdAndDelete(spreadId);
        res.status(200).json({
                succed:true,
                data:deletedPerso
            });
        
    } catch (error) {
        res.status(500).json({
            succed:false,
            error:'Something went wrong'+ error.message
        });
        console.log(error);
    }

}

