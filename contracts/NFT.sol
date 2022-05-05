//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
contract NFT is ERC721URIStorage{
    constructor()ERC721('abc','sdsd'){

    }
using Counters for Counters.Counter; 
Counters.Counter private token_ID;

function createToken()public returns(bool){
    
}

}