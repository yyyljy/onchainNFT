const jwt = require(`../middlewares/jwt`);
const AccountsService = require("./web3-services/accounts.service");
const accountsService = new AccountsService();

async function mint(request, address) {
  try {
    await accountsService.mint(address,1,1,"0x");
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function tokenUri(req) {
  try {

    let text = '디지털휴먼NFT의 token uri를 조회하고 반환함';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

module.exports = {
  mint,
  tokenUri,
};