const jwt = require(`../middlewares/jwt`);
const crypto = require("crypto");
const { generateUserWallet } = require("../modules/web3-modules/wallets");

async function login(req) {
  try {
    const userWallet = generateUserWallet(req.body.email);
    let evmAddress = userWallet.address;
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