import { ipfsClient, ipfsGateway } from "./ipfsClient";
import {createCollectionMeta} from './schemes/collectionMetaScheme'

export const uploadImage = async image => {
  const { path } = await ipfsClient.add(image);

  return path;
};

export const uploadCollectionMeta = async data => {
  const meta = createCollectionMeta(data)
  const str = JSON.stringify(meta);
  const { path } = await ipfsClient.add(str);

  return path;
}