import React from "react";
import { Menu } from "semantic-ui-react";
const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>
        <b>NFT BAZAAR</b>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <b>MARKET</b>
        </Menu.Item>
        <Menu.Item>
          <b>AUCTION</b>
        </Menu.Item>
        <Menu.Item>
          <b>+ CreateNFT</b>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
