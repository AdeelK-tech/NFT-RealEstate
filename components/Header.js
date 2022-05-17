import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link, Router } from "../routes";
const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">
          <b>NFT FARM</b>
        </a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/nfts/market">
          <a className="item">
            <b>MARKET</b>
          </a>
        </Link>
        <Link route="/nfts/create">
          <a className="item">
            <b>+ CreateNFT</b>
          </a>
        </Link>
        <Dropdown item icon="user">
          <Dropdown.Menu>
            <Link route="/user/assets">
              <a>
                <Dropdown.Item>My Assets</Dropdown.Item>
              </a>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
