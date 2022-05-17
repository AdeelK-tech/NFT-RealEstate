import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import marketInstance from "../../marketInstance";
import NFT from "../../components/NFT";
import nftInstance from "../../nftInstance";
import axios from "axios";
import web3 from "../../web3";

const Item = ({ props }) => {
  const [marketItem, setMarketItem] = useState({});
  const { nft, id } = props;
  console.log(nft);
  const GetData = async () => {
    const tokenURI = await nftInstance.methods.tokenURI(nft.tokenID).call();
    console.log(nft);
    const meta = await axios.get(tokenURI);
    const price = web3.utils.fromWei(nft.price, "ether");
    const item = {
      itemId: id,
      tokenId: nft.tokenID,
      name: meta.data.name,
      price: price,
      image: meta.data.image,
      owner: nft.owner,
      seller: nft.seller,
      description: meta.data.description,
    };
    setMarketItem(item);
  };
  useEffect(() => {
    GetData();
  }, []);
  console.log(marketItem);
  return <NFT NFT={marketItem}></NFT>;
};
item.getInitialProps = async (props) => {
  let id = props.query.id;
  console.log(id);
  let nft = await marketInstance.methods.idToMarketItem(id).call();

  return {
    props: {
      id,
      nft,
    },
  };
};
export default Item;
