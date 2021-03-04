import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./create-styles.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import { Create721 } from "./Create721";
import { Create721Asset } from "./Create721Asset";
import { WalletBalances } from "../EthBridge/WalletBalances";
import { useStores } from "../../stores";

export const Create = () => {
  const { routing, user, exchange, actionModals } = useStores();

  const openCreate721Modal = () => {
    return actionModals.open(() => <Create721 />, {
      title: "Connect Your Wallet",
      //closeText: "Close",
      noValidation: true,
      width: "600px",
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      }
    });
  };

  const openCreate721AssetModal = (type: 'hrc721' | 'hrc1155') => {
    return actionModals.open(() => <Create721Asset type={type} />, {
      title: "Connect Your Wallet",
      //closeText: "Close",
      noValidation: true,
      width: "600px",
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      }
    });
  };


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
                // color: '#47b8eb',
                fontWeight: 600,
                letterSpacing: 0.2
              }}
              size="large"
            >
              Create Collectibles
            </Title>
          </Box>
          <Box justify="center" style={{ minHeight: "300px", background: "white", borderRadius: 5 }} pad="xlarge">
            <Box justify="center" style={{ width: "650px", textAlign: 'center', margin:'auto' }}>
              <Box>
                <Text>
                  Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one
                  collectible multiple times
                </Text>

              </Box>

              <Box
                style={{marginTop: '20px', marginBottom: '20px'}}
                justify="center"
                direction="row">
                <Box className={styles.collectionType} onClick={() => openCreate721AssetModal('hrc721')}>

                  <img className={styles.collectionTypeImage} src="/davinciCards_single.svg" />

                  Single
                </Box>
                <Box className={styles.collectionType} onClick={() => openCreate721AssetModal('hrc1155')}>

                  <img className={styles.collectionTypeImage} src="/davinciCards_multiple.svg" />

                  Multiple
                </Box>
              </Box>
              <Box>
                <Text>
                  We do not own your private keys and cannot access your funds without your confirmation
                </Text>
              </Box>
            </Box>
          </Box>

        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
