import { React, useEffect, useState } from "react";
import Assets from "../../components/Assets";
import marketInstance from "../../marketInstance";
import web3 from "../../web3";
import nftInstance from "../../nftInstance";
import axios from "axios";

const UserAssets = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [address,setAddress]=useState('');
  const AccountWasChanged=async()=>{
    const accounts=await web3.eth.requestAccounts();
    const account=accounts[0];
    setAddress(account)
  }
  window.ethereum.on('accountsChanged',AccountWasChanged)
 
  const GetAssets = async () => {
    setLoading(true);
    const accounts = await web3.eth.requestAccounts();
    const items = await marketInstance.methods.fetchMyNfts().call({
      from: accounts[0],
    });
    const userAssets = await Promise.all(
      items.map(async (i) => {
        const tokenURI = await nftInstance.methods.tokenURI(i.tokenID).call();
        const meta = await axios.get(tokenURI);
        const price = web3.utils.fromWei(i.price, "ether");
        const item = {
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
    setAssets(userAssets);
    setLoading(false);
    
  };
  useEffect(() => {
    GetAssets();
  }, [address]);

  return <Assets assets={assets} loading={loading}/>;
};
export default UserAssets;
