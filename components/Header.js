import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, Router } from "../routes";
const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route='/'>
        <a className="item">
          <b>NFT CHOWK</b>
        </a>
      </Link>
      <Menu.Menu position="right">
        <Link route='/nfts/market'>
          <a className="item">
            <b>MARKET</b>
          </a>
        </Link>
        <Link route='/nfts/auction'>
          <a className="item">
            <b>AUCTION</b>
          </a>
        </Link>
        <Link route='/nfts/create'>
          <a className="item">
            <b>+ CreateNFT</b>
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
