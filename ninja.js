const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create geo location schema
const GeoSchema = new schema({
    type: {
        type : String,
        default : "Point"
    },
    coordinates: {
        type : [Number],
        index : "2dsphere"
    }
});

//create ninja schema & model

const NinjaSchema = new schema({
    name : {
        type : String,
        required:[true, 'Name field is required']
    },
    rank : {
        type : String
    },
    availabe : {
        type : Boolean,
        default : false
    },
    geometry : GeoSchema
    //add in the geo location
});


//model
const Ninja = mongoose.model('ninja',NinjaSchema);

//exporting
module.exports = Ninja;


