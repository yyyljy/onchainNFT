// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/IERC7510.sol";
import "./Utility.sol";

// , ERC721Enumerable ,
contract ERC7510 is ERC721, IERC7510, Utility {
    mapping(uint256 => Token[]) private _parentTokens;
    mapping(uint256 => mapping(address => mapping(uint256 => bool)))
        private _isParentToken;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC7510).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function parentTokensOf(
        uint256 tokenId
    ) public view virtual override returns (Token[] memory) {
        require(_exists(tokenId), "ERC7510: query for nonexistent token");
        return _parentTokens[tokenId];
    }

    function isParentToken(
        uint256 tokenId,
        Token memory otherToken
    ) public view virtual override returns (bool) {
        require(_exists(tokenId), "ERC7510: query for nonexistent token");
        return _isParentToken[tokenId][otherToken.collection][otherToken.id];
    }

    function setParentTokens(
        uint256 tokenId,
        Token[] memory parentTokens
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC7510: caller is not owner or approved"
        );
        _clear(tokenId);
        for (uint256 i = 0; i < parentTokens.length; i++) {
            _parentTokens[tokenId].push(parentTokens[i]);
            _isParentToken[tokenId][parentTokens[i].collection][
                parentTokens[i].id
            ] = true;
        }
        emit UpdateParentTokens(tokenId);
    }

    function _clear(uint256 tokenId) internal {
        Token[] storage parentTokens = _parentTokens[tokenId];
        for (uint256 i = 0; i < parentTokens.length; i++) {
            delete _isParentToken[tokenId][parentTokens[i].collection][
                parentTokens[i].id
            ];
        }
        delete _parentTokens[tokenId];
    }

    function _isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) internal view returns (bool) {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }

    function initRootInventory(uint256 tokenId, Token memory parent) internal {
        _clear(tokenId);
        _parentTokens[tokenId].push(parent);
        _isParentToken[tokenId][parent.collection][parent.id] = true;
    }
}
