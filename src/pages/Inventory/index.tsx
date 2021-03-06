import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./inventoryPage.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import {CollectibleList} from "../../components/Collections/collectibleList";
import { WalletBalances } from "../EthBridge/WalletBalances";
import { useStores } from "../../stores";

let items = [
  {
    image: 'https://lh3.googleusercontent.com/GmRKisMCrJDDIHP1XQdkXZzlgyn5xULaTKyqzT_wR_6nBJ12r4f7euftaHX7BY6jc1ntx6qNc7tnctjbUPLpWfuDFgRoPOgbZhHGBw=s250',
    name: 'Blue Ethereum',
    price: '0.2',
    currency: 'ONE'
  },
  {
    image: 'https://lh3.googleusercontent.com/JoebdEooStsRyqiCTZkQrVCryLLjJ6OrupsrS6F_ezalXAJ9tHvL32Q7BVBiqokK6LcxGbq-EfLgl_1z7S6z36Y2gZsc7hJd72kR=s250',
    name: 'Everything you say will be used against you',
    price: '5',
    currency: 'ONE'
  },
  {
    image: 'https://stream.mux.com/WsSZyuWY00vEViXuZijLpQsNORaA02elNQxgvWlITE8Cw/medium.mp4',
    name: 'Stone Push Study',
    price: '100',
    currency: 'ONE'
  },
  {
  image: 'https://f8n-ipfs-production.imgix.net/QmdPV5HuS5qmiTGwUKJRXVxLjgLqtFvXDRmYqsLRvhPUjr/nft.png?auto=format&h=640&q=80&resolution=medium',
    name: '100 Seconds To Midnight',
    price: '1',
    currency: 'ONE'
  }
]


export const Inventory = () => {
  const { routing, user, exchange, actionModals } = useStores();

  return (
    <BaseContainer>
      <PageContainer>
        <Box
          className={styles.container}
          pad={{ horizontal: "large", top: "large" }}
        >
          <Box direction="row" justify="center" margin={{ bottom: "medium" }}>
            <Title
              style={{
                fontWeight: 600,
                letterSpacing: 0.2
              }}
              size="large"
            >
              My Inventory
            </Title>
          </Box>

          <CollectibleList items={items}/>

        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
