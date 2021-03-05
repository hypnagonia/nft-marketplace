import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./styles.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import {CollectibleList} from "../../components/Collections/collectibleList";
import { useStores } from "../../stores";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

export const CollectibleListPage = observer(() => {
  const { collections } = useStores();
  const items = collections.collections;
  console.log({items})

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
              A new generation of art is emerging, collect it here
            </Title>
          </Box>

          <CollectibleList items={items}/>

        </Box>
      </PageContainer>
    </BaseContainer>
  );
});
