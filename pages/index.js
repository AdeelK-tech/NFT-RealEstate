import {React,useState} from 'react'
import Layout from "../components/Layout";
import { Button, Grid,Header } from "semantic-ui-react";
import {Link} from '../routes'
import Image from "next/image";
import '../styles/Home.module.css'

export default function Home({props}) {
  
  return (
    <Layout>
       <Header as='h1' dividing style={{fontSize:'35px',color:'white',fontFamily:'tahoma'}}>
  A REAL STATE NFT
   MARKETPLACE
  </Header>
      <Image src='/image_2.png' width={`${850}px`} height={`${350}px`}></Image>
      <Link route='/nfts/create'>
      <a>
      <Button
        floated="right"
        content="createNFT"
        icon="add circle"
        secondary
      >
      </Button>
      </a>
      </Link>
    </Layout>
  );
}
