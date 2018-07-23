const express = require('express');
//Requiring express router
const router = express.Router();

const Conf = require('../models/model_confirmation'); //require device model
const Users = require('../models/model_node'); //require user model to validate userID.

router.post('/sendConf', (req, res) => {
    //checking request body:
    if (!req.body.to || !req.body.from || !req.body.items) {
        res.json({
            success: false,
            msg: 'Insufficient Conf'
        });
    }
    let data = {
        to: req.body.to,
        from: req.body.from,
        item: req.body.items
    }

    //To add devices:
    Conf.addConf(data, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: "Your req is succesfully placed" + " " + data.from
            });
        }
    });

})




//Method to delete Conf
router.post('/getConf', (req, res) => {
    //checking request body:
    if (!req.body.to) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Conf.getNodeByUserName(req.body.to, (err, reqConf) => {

        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (reqConf.length == 0) {
                res.json({
                    success: false,
                    msg: "no request found for you!"
                });
            } else {
                reqConf.forEach(function (orders) {
                    //To delete confirmations:
                    Conf.removeConf(orders._id, (err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        }
                    });
                });
                res.json({
                    success: true,
                    msg: reqConf
                });
            };

        }
    });
});


//Exporting the router as a Module
module.exports = router;