// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "./ERC6150.sol";

struct Part {
    string name;
    uint8 zindex;
    uint16 x;
    uint16 y;
}

struct Item {
    string name;
    string part;
    string[] imageData;
}
contract DNFT is ERC6150 {
    Part[] public parts;
    mapping(string => uint256) public indexInPartsArray;

    Item[] private _items;
    // item.name => index
    mapping(string => uint256) private indexInItemsArray;

    // part => name => imageData
    mapping(string => mapping(string => string[])) itemImage;    

    constructor(
        string memory name,
        string memory symbol,
        Part[] memory _parts
    ) ERC6150(name, symbol) {
        for (uint256 i = 0; i < _parts.length; i++) {
            parts.push(_parts[i]);
            indexInPartsArray[_parts[i].name] = i;
        }
    }

    function safeMintCharacter(address to) external returns(uint256) {
        uint256 tokenId = totalSupply() + 1;
        _safeMintWithParent(to,0,tokenId);
        return tokenId;
    }

    function makeItem(Item memory item) public {
        
    }

    function safeEquipItem(address to, Item[] memory items) external returns(uint256) {
        uint256 tokenId = totalSupply() + 1;
        _safeMintWithParent(to,0,tokenId);
        // image[tokenId][partData.name] = partData.imageData;
        return tokenId;
    }
}
