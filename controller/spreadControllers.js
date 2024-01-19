const Electeur=require('../models/electeurs');
// const {d}=require('mongoose');
const mongoose=require('mongoose');


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
            succeed:false,
            error: 'Sommething went Wrong!!!'
        });
        console.log(error);
    }
    
}

exports.getOneSpreadRows =async (req,res)=>{
     const spreadId= req.params.id;
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
            succeed:false,
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
            succeed:false,
            error: 'Sommething went Wrong!!!'
        });
        console.log(error);
    }
    
}

exports.postOneSpreadRow = async (req, res) => {
    const requiredFields = [
        'firstName', 'secondName', 'nationalIdentityNumber',
        'voterNumber', 'dateOfBirth', 'placeOfBirth',
        'votingPlace'
    ];

    const missingFields = [];
    const isValid = requiredFields.every((field) => {

        //  console.log(req.body[field]);
        if(!req.body[field] || req.body[field] === '') {
            missingFields.push(field);
            return false;
        }
        return true;
    });

    if (!isValid) {
        return res.status(400).json({
            succeed: false,
            error: 'Bad Request',
            message:'Certaines données requises sont manquantes.',
            missingFields,
        });
    }

    const electorInstance = new Electeur(req.body);

    try {
        await electorInstance.validate();

        await electorInstance.save();

        return res.status(201).json({
            succeed: true,
            message: 'Data saved successfully.',
        });
    } catch (error) {
        // console.error(error);

        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                succeed: false,
                error: 'Validation error.',
                validationErrors: error.errors,
            });
        } else {
            return res.status(500).json({
                succeed: false,
                error: error.errors
            });
        }
    }
};

exports.putOneSpreadRow=async (req,res)=>{

    const spreadId= req.params.id;
        if (!mongoose.isValidObjectId(spreadId)) {
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
                succeed: false,
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
            succeed:false,
            error:'Something went wrong'+ error.message
        });
        console.log(error);
    }
};

exports.deleteOneSpreadRow=async (req,res)=>{
    const spreadId= req.params.id;
        if (!mongoose.isValidObjectId(spreadId)) {
            return res.status(400).json({
                succeed: false,
                error: 'Invalid spread ID'
            });
        }
    try {
        const perso=await Electeur.findById(spreadId);
        if(!perso){
            return res.json(404).json({
                succeed:false,
                error: 'Row not found !!!'
            });
        }

        const deletedPerso=await Electeur.findByIdAndDelete(spreadId);
        res.status(200).json({
                succeed:true,
                data:deletedPerso
            });
        
    } catch (error) {
        res.status(500).json({
            succeed:false,
            error:'Something went wrong'+ error.message
        });
        console.log(error);
    }

}

