const { ethers } = require("ethers");
const PROVIDER = process.env.DEFAULT_PROVIDER;
const BLOCKCHAIN_NETWORK = process.env.DEFAULT_NETWORK;
class Provider extends ethers.JsonRpcProvider{
  constructor() {
    super(process.env[`${PROVIDER}_${BLOCKCHAIN_NETWORK}_HTTP_PROVIDER`]);
  }
}

module.exports = Provider;