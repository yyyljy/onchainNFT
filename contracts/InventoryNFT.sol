// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./ERC7510.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract InventoryNFT is ERC7510, ERC721Enumerable {
    address private humanNFT;
    mapping(address => uint256) rootTokenId;
    mapping(uint256 => string[]) image;

    constructor(
        string memory name,
        string memory symbol,
        address humanNFT_
    ) ERC7510(name, symbol) {
        humanNFT = humanNFT_;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC7510, ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(ERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function safeMintRootInventory(
        address to,
        // string memory metadataURI,
        uint256 parentId
    ) external {
        require(rootTokenId[to] == 0, "ALREADY HAS ROOT INVENTORY");
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        rootTokenId[to] = tokenId;
        Token[] memory parents = new Token[](1);
        parents[0] = Token(humanNFT, parentId);
        initRootInventory(tokenId, parents[0]);

        emit UpdateParentTokens(tokenId);
    }

    function safeMintRootInventoryImage(
        address to,
        // string memory metadataURI,
        uint256 parentId,
        string[] memory imageData
    ) external {
        require(rootTokenId[to] == 0, "ALREADY HAS ROOT INVENTORY");
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        rootTokenId[to] = tokenId;
        Token[] memory parents = new Token[](1);
        parents[0] = Token(humanNFT, parentId);
        initRootInventory(tokenId, parents[0]);
        image[tokenId] = imageData;

        emit UpdateParentTokens(tokenId);
    }

    function safeMintInventory(address to, string memory metadataURI) external {
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        Token[] memory parents;
        parents[0] = Token(address(this), rootTokenId[to]);
        setParentTokens(tokenId, parents);
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
        _clear(tokenId);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function tokenImageData(
        uint256 tokenId
    ) public view returns (string[] memory) {
        return image[tokenId];
    }
}
