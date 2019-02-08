const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');


//get a list of ninjas from the database.....get request
router.get('/ninjas' ,function(req,res,next){
    Ninja.aggregate().near({
        near:[parseFloat(req.query.lng),parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function(ninja){
        res.send(ninja);
    });
    });

//add a new ninja to the database ......post request
router.post('/ninjas' ,function(req,res,next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
 
});

//update a ninja to the database....put request
router.put('/ninjas/:id' ,function(req,res,next){
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(ninja){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
            res.send(ninja);
        });
        
    });
 
});

//delete a ninja from the database....delete request
router.delete('/ninjas/:id' ,function(req,res,next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});

//exporting...
module.exports=router;