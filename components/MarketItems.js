import React from 'react'
import Layout from './Layout'
import { Card, Loader,Button,Icon } from 'semantic-ui-react'
import{Link} from '../routes'

const MarketItems=({loading,items})=>{
    
    
   
    const displayItems=items.map((nft,i)=>{
     return{

        
         image:nft.image,
         header:nft.name,
         meta:`Price: ${nft.price} ETH`,
         description: nft.description,
         extra:<Link route={`/nfts/market/item/${nft.itemId}`}><a><Button secondary>View item
         <Icon name='right chevron' /></Button></a>
         </Link>
     }       //fix add item id to the struct of item///
            //fix add item id to the struct of item///
    })

    console.log(displayItems);

    return(
        <div>
        {loading?(<Loader active inline='centered' />):
        <Card.Group items={displayItems}></Card.Group>

        }
        </div>
    )
}
export default MarketItems