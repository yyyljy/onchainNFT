// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC7510.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HumanNFT is ERC7510, ERC721URIStorage {
    uint256 private _nextTokenId;
    mapping(address => uint256) isOwnerOf;

    // address private parts;
    constructor(
        string memory name,
        string memory symbol
    ) ERC7510(name, symbol) {}

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC7510, ERC721URIStorage) returns (bool) {
        return
            interfaceId == type(ERC721URIStorage).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function safeMint(address to, string memory metadataURI) external {
        require(isOwnerOf[to] == 0,"ALREADY HAS NFT");
        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        isOwnerOf[to] = tokenId;
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
        _clear(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function hasDHN(address owner) public view returns(uint256 tokenId) {
        return isOwnerOf[owner];
    }

    // function equipParts(uint256 tokenId) external {
    //     _isApprovedOrOwner(_msgSender(), tokenId);
    //     Token memory token = Token(address(this), 1);
    //     setParentTokens(tokenId, 2);
    // }
}
