

data={
        'id':1,
        'name':'Moussa',
        'nickName':'Diallo',
        'school': 'ESP'
    }
exports.getSpreadRows =async (req,res)=>{

    
     res.status(200).json({
        succeed: true,
        message:data
    });
}

exports.postOnSpread= (req,res)=>{

    const perso={};

    if(req.body.name) perso.name=req.body.name;
    if(req.body.nickName) perso.nickName=req.body.nickName;
    if(req.body.school) perso.school=req.body.school;
    perso.id=2;

    data.push(perso);

    res.status(201).json({
        succeed: true,
        message: data
    });

}


