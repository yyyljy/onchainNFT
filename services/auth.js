const jwt = require(`../middlewares/jwt`);
const { keccak256, HDNodeWallet } = require("ethers");
const crypto = require("crypto");

let userId = crypto.randomBytes(16).toString('hex');
console.log('test', userId)


async function login(req) {
  try {
    const encodedSeed = new TextEncoder().encode(req.body.email);
    const seed = keccak256(keccak256(encodedSeed));
    const wallet = HDNodeWallet.fromSeed(seed);
    console.log(`Wallet Created[${seed}][${wallet.address}]`);
    let evmAddress = wallet.address;

    let createId = crypto.randomBytes(16).toString('hex');

    let createJwt = {
      userType: 'ADVERTISER',
      id: createId,
      uuid: '1', // db 에 있는 값을 가져와야할것 같음
      name: req.body.firstName,
      email: req.body.email,
      snsProvider: req.body.snsProvider,
      evmAddress,
    }

    const accessToken = await jwt.sign(createJwt);

    let result = {
      createJwt,
      accessToken,
      evmAddress
    }

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  login,
};