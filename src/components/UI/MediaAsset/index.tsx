import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text } from "components/Base";
import * as styles from "./mediaAsset.styl";
import { imageExtensions, audioExtensions, videoExtensions } from "../../../constants/extensionTypes";


import { useStores } from "../../../stores";
import cn from "classnames";

const isBelongToExtensionGroup = url => extensionArr => extensionArr.find(e => url.indexOf(e) !== -1);

export const MediaAsset = ({ url }: any) => {
  // const { actionModals } = useStores();
  const isExtension = isBelongToExtensionGroup(url);

  let type = "image";
  if (isExtension(imageExtensions)) {
    type = "image";
  } else if (isExtension(videoExtensions)) {
    type = "video";
  } else if (isExtension(audioExtensions)) {
    type = "audio";
  }

  return (
    <>
      {type === 'image' && <img className={styles.collectionImage} src={url} />}
      {type === 'video' && <video autoPlay className={styles.collectionImage} src={url} />}
    </>
  );
};
