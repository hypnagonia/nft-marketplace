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

  const openCreate721AssetModal = () => {
    return actionModals.open(() => <Create721Asset />, {
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
          <Box style={{ background: "white", borderRadius: 5 }} pad="xlarge">

            <Title>
            <span style={{ cursor: "pointer" }} onClick={openCreate721Modal}>
              Create 721 Collection
            </span>
            </Title>
            <Title>
              <span style={{ cursor: "pointer" }} onClick={openCreate721AssetModal}>
              Create 721 Collectible
              </span>
            </Title>

          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
