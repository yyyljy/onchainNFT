const { keccak256 } =require( "ethers");
const Provider = require( "./provider");

const { ethers } = require("ethers");
const OPERATOR_PRIVATE_KEY = process.env.OPERATOR_PRIVATE_KEY;
const PROVIDER = new Provider();

class OperatorWallet extends ethers.Wallet {
    constructor() { 
        super(OPERATOR_PRIVATE_KEY,PROVIDER);
    }
}

const generateUserWallet = (seedString) => {
    const encodedSeed = new TextEncoder().encode(seedString);
    const seed = keccak256(keccak256(encodedSeed));
    return ethers.HDNodeWallet.fromSeed(seed);
}

module.exports={
OperatorWallet,generateUserWallet
}