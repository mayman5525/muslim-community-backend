const { time } = require("console");
const mongoose = require("mongoose");

const subscription = new mongoose.Schema({
    subscriptionId : {type: String, required: true},
    subscriptionType: { type  : String , required : true , enum :["businessOwner" , "adv" ,"groups"] },
    startDate : {type :time } ,
    endDate :{type :time },

}, { timestamps: true });

module.exports = mongoose.model("subscription", subscription);
