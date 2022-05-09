const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Testing contract', () => {
  let address;
  let contract;
  let nftContract
  let owner;
  let addr1;
   beforeEach(async() => {
     [owner,addr1]=await ethers.getSigners();
     contract= await ethers.getContractFactory('NFT');
      nftContract=await contract.deploy();
    address =nftContract.address;
    });

    describe('first test', () => {
      it('print address',async () => {
        console.log(address);
        await nftContract.caller();
        console.log(owner.address)
      });
    });
});
