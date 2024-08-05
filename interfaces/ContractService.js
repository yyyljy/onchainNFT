const { ethers } = require("ethers");
const path = require("path");
const { OperatorWallet } = require("../modules/web3-modules/wallets");
const signer = new OperatorWallet();
class ContractService extends ethers.Contract {
  constructor(contractName, contractAddress) {
    const ArtifactPath = path.join(process.env.PWD, process.env.CONTRACT_PATH, "artifacts/", `${contractName}.json`);
    const {abi} = require(ArtifactPath);
    super(contractAddress,abi,signer);
    this.name = contractName;
    this.signer = signer;
  }

  async getTransactionReceipt(txHash) {
    try {
      const receipt = await this.signer.provider.waitForTransaction(txHash);
      console.log(`${this.name} txHash:${txHash}\nblockNumber:${receipt?.blockNumber}`);
      return receipt;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = ContractService;