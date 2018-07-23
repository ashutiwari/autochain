'use strict'


var CryptoJs = require('crypto-js')
var SHA256 = require("crypto-js/sha256");
var express = require('express')
var bodyparser = require('body-parser')
var WebSocket = require('ws')


//define a block structure as per block chain
class Block {

    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}


var messageType = {

    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};



var getGenesisBlock = () => {

    return new Block(0, "0", 14556783, "my genesis block", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
}


module.exports.blockchain = [getGenesisBlock()];

module.exports.generateNextBlock = (blockData) => {
    
    var previousBlock = JSON.parse(getLatestBlock());
    var nextIndex = previousBlock.index + 1;
    var nextTimeStamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimeStamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimeStamp, blockData, nextHash);

}


var calculateHash = (index, previousHash, timestamp, data) => {

    return SHA256(index + previousHash + timestamp + data).toString();

}

//calculate hash for blocks

var calculateHashForBlock = (block) => {

    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
}



//add a block into blockchain
module.exports.addBlock = (newBlock) => {

    console.log(newBlock)
    var latest=JSON.parse(getLatestBlock());
    console.log("latest"+latest);

    if (isValidNewBlock(newBlock, latest)) {

        module.exports.blockchain.push(newBlock);
        
    }
}

var isValidNewBlock = (newBlock, previousBlock) => {
    console.log(newBlock.index)
    console.log(previousBlock.index)
    
    if (previousBlock.index + 1 != newBlock.index) {
        console.log("invalid index");
        return false;
    }
    else if (previousBlock.hash != newBlock.previousHash) {
        console.log("invalid previoushash")
        return false;
    }
    else if (calculateHashForBlock(newBlock) != newBlock.hash) {
        console.log(typeof calculateHashForBlock(newBlock))
        console.log("invalid hash :" + calculateHashForBlock(newBlock) +"=="+ newBlock.hash);
        return false
    }
    return true;

}


var getLatestBlock = () => {

    module.exports.blockchain[module.exports.blockchain.length - 1];
    return JSON.stringify(module.exports.blockchain[module.exports.blockchain.length - 1])
}


//===============================

var queryChainLengthMsg = () => ({
    // 'type': messageType.QUERY_LATEST
    'type': messageType.QUERY_LATEST
 })
 
 var queryAllMsg = () => ({
     'type': messageType.QUERY_ALL
 
 
 });
 
 var responseChainMsg = () => ({
 
     'type': messageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(module.exports.blockchain)
 
 });
 
 module.exports.responseLatestMsg = () => ({
 
     'type': messageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(getLatestBlock())
 
 });
 //=========================================