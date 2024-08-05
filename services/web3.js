const { ethers } = require("ethers");

async function isDHNOwner(address) {
  try {
    DHN_SERVICE.inputLog("hasDHN", { address });
    const tokenId = await DHN_SERVICE.contract.hasDHN(address);
    console.log(tokenId);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mintDHN(address, metadataURI) {
  try {
    DHN_SERVICE.inputLog("mintDHN", { address, metadataURI });
    const { hash } = await DHN_SERVICE.contract.safeMint(address, metadataURI);
    const receipt = await DHN_SERVICE.getTransactionReceipt(hash);
    return receipt;

  } catch (error) {
    console.log(error);
    return error;
  }
}


module.exports = {
  isDHNOwner,
  mintDHN
}