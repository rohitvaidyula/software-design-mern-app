const {Router} = require('express');
//const fakeDat = require('../testData/testData.json');
const mongoose = require('mongoose');




const router = Router();

const historySchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLenght:5
    },
    //added final price in case may want/need final price
    finalPrice:{
        type:Number
    },
    quoteID:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
},{collection:'dat'},
    {
        timestamps:true
});

const historyModel = mongoose.model('dat',historySchema);



router.get('/FuelQuoteHistInfo',async (req,res)=>{
    try{
        //console.log(historyModel.find())
        //search for all history with a certain username/clientID
        var user = req.query.cID;
        //console.log(user);
        historyModel.find({username: user},function(err,data){
            res.json(data)
        });
        //res.status(200).json(fakeDat)
    }
    catch(error){
        res.status(500).json({message:'Server error ', error});
    }
});

module.exports = router;