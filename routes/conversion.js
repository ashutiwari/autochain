const express = require('express');
//Requiring express router
const router = express.Router();
//requiring models
const Type = require('../models/model_type');
const Zone = require('../models/model_zone');
const Name = require('../models/model_name');

var rn = require('random-number');

var gen8 = rn.generator({
    min: 10000000,
    max: 99999999,
    integer: true
})
var gen12 = rn.generator({
    min: 100000000000,
    max: 999999999999,
    integer: true
})





router.post('/getUuid', (req, res) => {
    //checking request body:
    if (!req.body.productName || !req.body.zone || !req.body.type) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        Name.getNameByName(req.body.productName, (err, reqName) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                Zone.getZoneByName(req.body.zone, (err, reqZone) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        })
                    } else {

                        Type.getTypeByType(req.body.type, (err, reqType) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                })
                            } else {

                                var uuid = gen8() + "-" + reqName.number + "-" + reqType.number + "-" + reqZone.number + "-" + gen12()
                                res.json({

                                    success: true,
                                    uuid: uuid
                                })

                            }

                        })



                    }
                })
            }


        })
    }
})



router.post('/getItem', (req, res) => {
    //checking request body:
    if (!req.body.uuid) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {

        var uuidArray = req.body.uuid.split("-")

        Name.getNameByNumber(uuidArray[1], (err, reqName) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                Zone.getZoneByNumber(uuidArray[3], (err, reqZone) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        })
                    } else {

                        Type.getTypeByNumber(uuidArray[2], (err, reqType) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                })
                            } else {

                                item = {
                                    productName: reqName.productName,
                                    zone: reqZone.zone,
                                    type: reqType.type

                                }

                                res.json({

                                    success: true,
                                    item: item
                                })

                            }

                        })



                    }
                })
            }


        })
    }
})




module.exports = router;