const jwt = require(`../middlewares/jwt`);
const { isDHNOwner, mintDHN } = require("./web3");

async function imageDefault(req) {
  try {

    let text = '기본이미지 설정';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function imageByTokenId(req) {
  try {

    let text = '토큰 아이디 기준 이미지';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function image(req) {
  try {

    let text = '기본이미지 호츌?';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function insertMetadataByTokenId(req) {
  try {

    let text = '휴만 nft 에 메타데이터 추가';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function selectMetadataByTokenId(req) {
  try {

    let text = '휴만 nft 에 메타데이터 추가된거 조회';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function deleteMetadata(req) {
  try {

    let text = '어떤 메타데이터 삭제?';

    return text;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

async function mint(request, address) {
  let nftMetadata = {
    metadata: {
      image: "",
      attributes: []
    },
    metadataUri: "",
    imageUri: "",
    segmentId: "",
    ...request
  }
  console.log(nftMetadata);
  try {
    let text = '수신자에게 디지탈 휴만 nft 발행 후 tokenId 반환';
    console.log(text);
    const tokenId = Number(await isDHNOwner(address));
    if (tokenId) {
      throw new Error(`ALREADY HAS NFT[${tokenId}]`);
    };
    return await mintDHN(address, nftMetadata.metadataUri);
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
  imageDefault,
  imageByTokenId,
  image,
  insertMetadataByTokenId,
  selectMetadataByTokenId,
  deleteMetadata,
  mint,
  tokenUri,
};