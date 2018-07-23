const express = require('express');

const router = express.Router();

const WS = require('../WebSocket/webSocket');
const BC = require('../Blockchain/blockchain')

router.get('/peers', (req, res) => {
       
    res.send(WS.socket.map(s => s._socket.remoteAddress + ":" + s._socket.remotePort));

            
    
});

// router.post('/addPeer', (req, res) => {

//     WS.connectToPeers([req.body.peer]);
//     res.send();

// })

router.get('/blocks', (req, res) => res.send(JSON.stringify(BC.blockchain)));


router.post('/addchain', (req, res) => {

    //console.log(req.body.data);
    var newBlock = BC.generateNextBlock(req.body.data);
    BC.addBlock(newBlock);
    WS.brodcast(BC.responseLatestMsg());
    console.log('block added:' + JSON.stringify(newBlock));
    res.send("tansaction successfull");
});




module.exports = router;