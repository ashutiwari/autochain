var WebSocket = require('ws')

var p2p_port = process.env.p2p_port || 6009

var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

module.exports.socket = [];

var messageType = {

    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};


module.exports.initP2PServer = () => {

    var server = new WebSocket.Server({ port: p2p_port });
    server.on('connection', ws => initConnection(ws));
    console.log('listening websocket on :' + p2p_port);
}


var initConnection = (ws) => {
    
    module.exports.socket.push(ws);
  
};



var initMessageHandler=(ws)=>{

    ws.on('message',(data)=>{
    
        console.log("Message In:");
        const msg=JSON.parse(data)
        console.log(msg.event)
    })
    
    console.log("message handler setup");
    
    
    }



    module.exports.connectToPeers = (newPeers) => {

        newPeers.forEach(function (peer) {
    
            var ws = new WebSocket(peer)
            ws.on('open', () => initConnection(ws));
            ws.on('error', () => {
                console.log("connection fail")
            });
        });
    
    };


    var write = (ws, message) =>
ws.send(JSON.stringify(message));

module.exports.brodcast = (message) =>module.exports.socket.forEach(socket => write(socket,message));
module.exports.connectToPeers(initialPeers);

