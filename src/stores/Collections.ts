import { Collection } from './interfaces';
import { IStores } from './index';
import * as services from 'services';
import { ListStoreConstructor } from './core/ListStoreConstructor';
import { computed, observable } from "mobx";
import {NFTFactoriesManager} from '../blockchain-bridge/hmy'
import { observer } from "mobx-react";
import {ipfsGateway} from "../services/ipfs/ipfsClient";

const initialCollections: Collection[] = [
  {
    name: 'daVinci',
    symbol: 'DAVINCI',
    image: '/davinci.png',
    baseURL: ''
  },
]

//NFTFactoriesManager
export class Collections {
  @observable public collectionsList: Collection[] = [];

  constructor(stores: IStores) {
    this.fetchCollections()
  }

  fetchCollections = async () => {
    // @ts-ignore
    const collectionsAddresses = await NFTFactoriesManager.getAllCollections()

    const collectionsWithContractUri = await Promise.all(collectionsAddresses.map(async e => {
      if (e.type==='721') {
        return { ...e, contractURI: (await NFTFactoriesManager.getHRC721ContractURI(e.address))}
      }
      return {...e, contractURI: (await NFTFactoriesManager.getHRC1155ContractURI(e.address))}
    }))

    const collectionsWithMeta = await Promise.all(collectionsWithContractUri.map(async e => {
      const meta = await fetch(`${ipfsGateway}/${e.contractURI}`).then(r=>r.json())
      const image = `${ipfsGateway}/${meta.image}`
      return {...e, ...meta, image}
    }))

    this.collectionsList = collectionsWithMeta
  }

  @computed get collections() {
    return this.collectionsList //this.data
  }
}
