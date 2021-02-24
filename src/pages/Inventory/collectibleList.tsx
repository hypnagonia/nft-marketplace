import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./collectibleList.styl";

import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import {MediaAsset} from '../../components/UI/MediaAsset'
import { useStores } from "../../stores";
import cn from "classnames";


export const CollectibleList = ({ items }: any) => {
  const {  actionModals } = useStores();



  return (
    <Box
      className={styles.container}
      direction="row"
      align="start"
      wrap
      gap={"50x"}
    >

      {items.map((c, i) => (
        <Box
          key={c.symbol + c.name}
          onClick={()=>{}}
          className={cn(styles.cardContainer, '')}
   >

          <MediaAsset url={c.image} />

          <Box className={styles.cardDescriotion} direction="column" align="start" justify="start">
          <div className={styles.name}>{c.name}</div>
            <div ><b>{c.price}</b> {c.currency}</div>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
