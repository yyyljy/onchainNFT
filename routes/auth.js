const express = require('express');
const router = express.Router();
const authController = require(`../controller/auth-controller`);

const { query, body, param, oneOf, validatorErrorChecker, oneValueExists } = require(`../middlewares/validator`);
// const { authorizationUser, authorizationOper, authorizationSys, checkUserType } = require(`../middlewares/authorize`);

router.post('/login',
  body('email').exists(),
  validatorErrorChecker,
  authController.login
);

module.exports = router;