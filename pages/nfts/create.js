import React from "react";
import { Form, Input, Label } from "semantic-ui-react";
import Layout from "../../components/Layout";
const createNFT = () => {
  return (
    <Layout>
      <h2>Create an NFT</h2>
      <Form>
        <Form.Field>
          <label style={{ fontSize: "large" }}>Name</label>
          <Input></Input>
        </Form.Field>
      </Form>
    </Layout>
  );
};
export default createNFT;
