import { React, useState, useEffect } from "react";

import marketInstance from "../../marketInstance";
import nftInstance from "../../nftInstance";
import axios from "axios";
import web3 from "../../web3";
import MarketItems from "../../components/MarketItems";

const market = () => {
  const [loading, setLoading] = useState(false);
  const [NFTS, setNFTS] = useState([]);
  const getNFTS = async () => {
    setLoading(true);
    const items = await marketInstance.methods.fetchMarketItems().call();
    console.log(items);
    const marketItems = await Promise.all(
      items.map(async (i) => {
        const tokenURI = await nftInstance.methods.tokenURI(i.tokenID).call();
        console.log(tokenURI);
        const meta = await axios.get(tokenURI);
        const price = web3.utils.fromWei(i.price, "ether");
        const item = {
          itemId: i.itemId,
          tokenId: i.tokenID,
          owner: i.owner,
          seller: i.seller,
          name: meta.data.name,
          image: meta.data.image,
          price: price,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNFTS(marketItems);
    setLoading(false);
  };
  useEffect(() => {
    getNFTS();
  }, []);
  console.log(NFTS);

  return <MarketItems loading={loading} items={NFTS}></MarketItems>;
};

export default market;
