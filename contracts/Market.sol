// SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
contract Market is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private item_ID;
    Counters.Counter private items_Sold;
    uint private ownerRoyality = 0.00005 ether;
    mapping(uint => marketItem) public idToMarketItem;

    event transferToMarket(uint id, address from, address to);
    error lessMoneythanPrice();
    struct marketItem {
        uint itemId;
        uint tokenID;
        bool sold;
        uint price;
        address payable seller;
        address owner;
    }

    function get_noOfSoldItems() public view returns (uint) {
        return items_Sold.current();
    }

    function createItem(
        uint _tokenID,
        uint _price,
        address nftContractAddress
    ) public nonReentrant() {
        item_ID.increment();
        uint itemId=item_ID.current();
        idToMarketItem[item_ID.current()] = marketItem(
            itemId,
            _tokenID,
            false,
            _price,
            payable(msg.sender),
            address(0)
        );
        console.log('address of the creator',idToMarketItem[item_ID.current()].seller);
        NFT(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenID
        );
        
        emit transferToMarket(_tokenID, msg.sender, address(this));
    }

    function buyItem(uint itemID, address nftContractAddress) public payable nonReentrant() {
        marketItem storage item = idToMarketItem[itemID];
        if(msg.value<item.price){
            revert lessMoneythanPrice();
        }
        item.seller.transfer(msg.value - ownerRoyality);
        payable(owner()).transfer(ownerRoyality);
        NFT(nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            item.tokenID
        );
        item.owner = msg.sender;
        item.sold = true;
        items_Sold.increment();
        console.log('address of buyer:',msg.sender);
    }

    function getCreatedItems() public view returns (marketItem[] memory) {
        uint itemCount;
        uint j;
        for(uint i=1;i<=item_ID.current();i++){
            if(idToMarketItem[i].seller==msg.sender){
                itemCount++;
            }
        }
        marketItem[] memory items=new marketItem[](itemCount);
        for(uint i=1;i<=item_ID.current();i++){
            if(idToMarketItem[i].seller==msg.sender){
                items[j]=idToMarketItem[i];
                j++;
            }
        }
        return items;
    }
    function fetchMyNfts()public view returns(marketItem[]memory){
        uint itemCount;
        uint j;
        for (uint i = 1; i <= item_ID.current(); i++) {
            if (idToMarketItem[i].owner == msg.sender){
                itemCount++;
                
            }
        }
        marketItem[] memory items=new marketItem[](itemCount);
        for(uint i=1;i<=item_ID.current();i++){
            if(idToMarketItem[i].owner==msg.sender){
                items[j]=idToMarketItem[i];
                j++;
            }
        }
        return items;
    }
    function fetchMarketItems()public view returns(marketItem[] memory){
         
        uint j;
        uint itemCount=item_ID.current();
        uint unsoldItemCount=item_ID.current()-items_Sold.current();
        marketItem[] memory items=new marketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i+1].sold==false) {
                items[j] = idToMarketItem[i+1];
                j++;
            }
        }
        return items;
    }
}
