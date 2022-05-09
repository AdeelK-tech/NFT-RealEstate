// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/Counters.sol';
import './NFT.sol';
contract Market{
    using Counters for Counters.Counter;
    Counters.Counter private item_ID;
    mapping(uint=>marketItem)idToMarketItem;
    event transferToMarket(uint id,address from,address to);
    error lessMoneythanPrice();
    struct marketItem{
        uint tokenID;
        bool sold;
        uint price;
        address payable seller;

    }
    function createItem(uint _tokenID,uint _price, address nftContractAddress)public {
        item_ID.increment();
        idToMarketItem[item_ID.current()]=marketItem(_tokenID,false,_price,payable(msg.sender));
        NFT(nftContractAddress).transferFrom(msg.sender,address(this),_tokenID);
        emit transferToMarket(_tokenID, msg.sender, address(this));
        
    }
    function buyItem(uint itemID,address nftContractAddress)public payable{
        marketItem storage item=idToMarketItem[itemID];
        if(msg.value<item.price){
            revert lessMoneythanPrice();
        }
        item.seller.transfer(msg.value);
        NFT(nftContractAddress).transferFrom(address(this),msg.sender,item.tokenID);
        
    }
}