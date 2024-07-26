const express = require('express');
const router = express.Router();
const dhnController = require(`../controller/dhn-controller`);

const { query, body, param, oneOf, validatorErrorChecker, oneValueExists } = require(`../middlewares/validator`);
const { checkAuthorization } = require(`../middlewares/authorize`);

// 유저에게 Root NFT를 발행하고 tokenId를 반환
router.post('/mint',
  validatorErrorChecker,
  checkAuthorization,
  dhnController.mint
);

// [SET] Root NFT 기본이미지 지정
router.post('/image/default',
  validatorErrorChecker,
  dhnController.imageDefaultSet
);

// [GET] Root NFT 기본이미지 조회
router.get('/image/default',
  validatorErrorChecker,
  dhnController.image
);

// [SET] NFT metadata 변경
router.put('/metadata/:tokenIdWithExt',
  validatorErrorChecker,
  dhnController.insertMetadataByTokenId
);

// [GET] NFT metadata 조회
router.get('/metadata/:tokenIdWithExt',
  validatorErrorChecker,
  dhnController.selectMetadataByTokenId
);

// [SET] Root NFT metadata 초기화
router.delete('/metadata',
  validatorErrorChecker,
  dhnController.deleteMetadata
);

module.exports = router;