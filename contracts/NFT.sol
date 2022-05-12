//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;
import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
contract NFT is ERC721URIStorage{
using Counters for Counters.Counter; 
Counters.Counter private token_ID;
address marketAddress;
    constructor(address _marketAddress)ERC721('NFT CHOWK','NFTCH'){
        marketAddress=_marketAddress;
    }


function createToken(string memory _tokenURI)public returns(uint){
    token_ID.increment();
    uint tokenId=token_ID.current();
    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    setApprovalForAll(marketAddress, true);
    return tokenId;
    
}


}