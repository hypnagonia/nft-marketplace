import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./collections-select.styl";

import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import { Collection } from "../../../stores/interfaces";
import { Create721 } from "../../../pages/Create/Create721";
import { useStores } from "../../../stores";
import cn from "classnames";

export type ICollectionSelect = {
  collections: Collection[]
  onChange: (value: number) => void
  value: number
}


export const CollectionSelect = ({ collections, onChange, value }: ICollectionSelect) => {
  const {  actionModals } = useStores();

  const openCreate721Modal = () => {
    return actionModals.open(() => <Create721 />, {
      title: "",
      noValidation: true,
      width: "600px",
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      }
    });
  };

  return (
    <Box
      className={styles.container}
      direction="row"
      align="start"
      wrap
      gap={"50x"}
    >

      <Box className={styles.cardContainer} style={{ background: "white", borderRadius: 5 }}
        onClick={openCreate721Modal}
      >
        <Icon glyph={"Plus"} className={styles.plus}/>
        <span className={styles.name}>New</span>
      </Box>

        {collections.map((c, i) => (
          <Box
            key={c.symbol + c.name}
            onClick={()=>onChange(i)}
            className={cn(styles.cardContainer, value === i ? styles.selected : '')}
            style={{ background: "white", borderRadius: 5 }}>

            <img className={styles.collectionImage} src={c.image} />

            <span className={styles.name}>{c.name}</span>
          </Box>
        ))}
    </Box>
  );
};
