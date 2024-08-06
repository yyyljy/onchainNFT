const express = require('express');
const router = express.Router();
const accountsController = require(`../controller/accounts-controller`);

const { query, body, param, oneOf, validatorErrorChecker, oneValueExists } = require(`../middlewares/validator`);
const { checkAuthorization } = require(`../middlewares/authorize`);

// 유저에게 Root NFT를 발행하고 tokenId를 반환
router.post('/mint',
  validatorErrorChecker,
  checkAuthorization,
  accountsController.mint
);


module.exports = router;