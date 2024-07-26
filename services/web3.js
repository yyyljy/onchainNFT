const { ethers } = require("hardhat");
const Web3ContractService = require("./interfaces/Web3Service");
const { imageToBytes32Array, bytes32ArrayToImage } = require("../modules/utils");
const PROVIDER_NAME = process.env.DEFAULT_PROVIDER;
const NETWORK = process.env.DEFAULT_NETWORK;
const DHN_ADDRESS = process.env[`${NETWORK}_DHN_ADDRESS`];
const INVENTORY_ADDRESS = process.env[`${NETWORK}_INVENTORY_ADDRESS`];
const PROVIDER = new ethers.JsonRpcProvider(process.env[`${PROVIDER_NAME}_${NETWORK}_HTTP_PROVIDER`]);
const SIGNER = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, PROVIDER);
const DHN_SERVICE = new Web3ContractService(PROVIDER, SIGNER, "HumanNFT", DHN_ADDRESS);
const INVENTORY_SERVICE = new Web3ContractService(PROVIDER, SIGNER, "InventoryNFT", INVENTORY_ADDRESS);

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

async function mintRootInventoryNFT(parentId, metadataURI, address) {
  try {
    // const fileName = "cat_128_1.webp";
    // const fileName = "cat_128_50.webp";
    const fileName = "dragon_512_25.webp";
    const imageData = imageToBytes32Array(fileName);
    console.log(imageData)

    INVENTORY_SERVICE.inputLog("safeMintRootInventory", { parentId, address })
    // const { hash } = await INVENTORY_SERVICE.contract.safeMintRootInventory(address, metadataURI, parentId);
    // const { hash } = await INVENTORY_SERVICE.contract.safeMintRootInventory(address, parentId);
    const { hash } = await INVENTORY_SERVICE.contract.safeMintRootInventoryImage(address, parentId, imageData);
    const receipt = await INVENTORY_SERVICE.getTransactionReceipt(hash);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getTokenImageData(tokenId) {
  try {
    const imageData = await INVENTORY_SERVICE.contract.tokenImageData(tokenId);
    console.log("imageData:", imageData);
    bytes32ArrayToImage(imageData, "dragon_restored.webp");
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  isDHNOwner,
  mintDHN,
  mintRootInventoryNFT,
  getTokenImageData
}