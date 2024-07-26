const { ethers } = require("ethers");
const Service = require("./Service");
const path = require("path");

class Web3ContractService extends Service {
  constructor(provider, signer, contractName, contractAddress) {
    super({ name: contractName });
    this.provider = provider;
    // this.networkName = networkName;
    // this.contractAddress = contractAddress;
    const ArtifactPath = path.join(process.env.PWD, process.env.CONTRACT_PATH, "artifacts/", `${contractName}.json`);
    const CONTRACT_ARTIFACT = require(ArtifactPath);
    this.contract = new ethers.Contract(contractAddress, CONTRACT_ARTIFACT.abi, signer);
  }

  async getTransactionReceipt(txHash) {
    try {
      const receipt = await this.provider.waitForTransaction(txHash);
      console.log(`txHash:${txHash}\nblockNumber:${receipt?.blockNumber}`);
      return receipt;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = Web3ContractService;