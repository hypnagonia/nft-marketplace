import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./styles.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { CollectibleList } from "../../components/Collections/collectibleList";
import { useStores } from "../../stores";
import { MediaAsset } from "../../components/UI/MediaAsset";

let item = {
  image: "https://lh3.googleusercontent.com/e-sryBKHxsL8EHCE6g_GQL92kogQtPZ9jcq3vmsemDNdD37sc8lQn_8TT4Tq19jv4FtJYIkdSzoy0njZqLNoaZo=s250",
  name: "Mother Playground",
  description: `
  I went THERE AND BACK AGAIN and found this woman asking GOD of Web for more likes. She dont realy know why she want this so badly. Her mental health is not stable. She strongly belive that more attention to her social media and lifestile will fix all the problems.
Like it or not, she is part of our society.
`,
  price: "1.2",
  currency: "ONE"
};

export const CollectibleDetailPage = () => {
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
              Collectible
            </Title>
          </Box>

          <Box direction ="row" justify="center" style={{ minHeight: "300px", background: "white", borderRadius: 5 }} pad="xlarge">
            <MediaAsset url={item.image} />

            <Box style={{marginLeft: '20px'}}>
              <Title>{item.name}</Title>
              <span>{item.description}</span>
              <span><b>{item.price}</b> {item.currency}</span>
            </Box>
          </Box>

        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
