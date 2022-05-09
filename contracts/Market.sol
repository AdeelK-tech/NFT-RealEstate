// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract Market is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private item_ID;
    Counters.Counter private items_Sold;
    uint private ownerRoyality = 0.00005 ether;
    mapping(uint => marketItem) public idToMarketItem;

    event transferToMarket(uint id, address from, address to);
    error lessMoneythanPrice();
    struct marketItem {
        uint tokenID;
        bool sold;
        uint price;
        address payable seller;
        address owner;
    }

    function getSoldItems() public view returns (uint) {
        return items_Sold.current();
    }

    function createItem(
        uint _tokenID,
        uint _price,
        address nftContractAddress
    ) public {
        idToMarketItem[item_ID.current()] = marketItem(
            _tokenID,
            false,
            _price,
            payable(msg.sender),
            address(0)
        );
        NFT(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenID
        );
        item_ID.increment();
        emit transferToMarket(_tokenID, msg.sender, address(this));
    }

    function buyItem(uint itemID, address nftContractAddress) public payable {
        marketItem storage item = idToMarketItem[itemID];
        if (msg.value < item.price) {
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
    }

    function getCreatedItems() public view returns (marketItem[] memory) {
        marketItem[] memory items;
        uint j;
        for (uint i = 0; i < item_ID.current(); i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                items[j] = idToMarketItem[i];
            }
        }
        return items;
    }
}
