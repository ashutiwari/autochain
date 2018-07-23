const express = require('express');
//Requiring express router
const router = express.Router();
//requiring models
const Type = require('../models/model_type');
const Zone = require('../models/model_zone');
const Name = require('../models/model_name');
var inc1 = 1123
var inc2 = 8123
var inc3 = 9123


router.post('/addProductName', (req, res) => {
    //checking request body:
    if (!req.body.productName) {
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
                if (reqName) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    name = {

                        productName: req.body.productName,
                        number: inc1
                    }

                    Name.addName(name, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: "Product name successfully added with number :"+inc1
                            });
                        inc1 = inc1 + 1
                    });

                }
            }
        })
    }
})


router.post('/addZone', (req, res) => {
    //checking request body:
    if (!req.body.zone) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        Zone.getZoneByName(req.body.zone, (err, reqZone) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (reqZone) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    zone = {

                        zone: req.body.zone,
                        number: inc2
                    }

                    Zone.addZone(zone, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: " Zone successfully added with number :"+inc2
                            });
                        inc2 = inc2 + 1

                    });

                }
            }
        })
    }
})

router.post('/addType', (req, res) => {
    //checking request body:
    if (!req.body.type) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        Type.getTypeByType(req.body.type, (err, reqType) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (reqType) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    type = {

                        type: req.body.type,
                        number: inc3
                    }

                    Type.addType(type, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: " Type successfully added with number :"+inc3
                            });
                        inc3 = inc3 + 1
                    });

                }
            }
        })
    }
})


module.exports = router;