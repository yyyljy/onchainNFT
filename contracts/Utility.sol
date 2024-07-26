// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract Utility {
    mapping(uint256 => address) private _owners;

    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }
}
