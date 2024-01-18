const express=require('express');
const router=express.Router();
const spreadControllers=require('../controller/spreadControllers');

router.get('/', spreadControllers.getAllSpreadRows);
router.post('/',spreadControllers.postOnSpread)

module.exports=router;