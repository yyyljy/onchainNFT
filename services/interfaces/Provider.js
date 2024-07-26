const { ethers } = require("hardhat");

class Provider {
  constructor(providerName,networkName){
    this.providerName = providerName;
    this.networkName = networkName;
    this.provider = new ethers.JsonRpcProvider(process.env[`${providerName}_${networkName}_HTTP_PROVIDER`]);
  }
}

module.exports = Provider;