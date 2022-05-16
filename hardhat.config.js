require("@nomiclabs/hardhat-waffle");
ALCHEMY_API_KEY='a3XyQIvDt5Dm14d5vKGzD39IU7c_wQV6'
ROPSTEN_PRIVATE_KEY='8dd9a1413df575220c56e07aa6954e21de61129d9ebc5a89816513cc86fa0167'
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten:{
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
