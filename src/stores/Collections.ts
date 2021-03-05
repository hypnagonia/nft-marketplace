import { Collection } from './interfaces';
import { IStores } from './index';
import * as services from 'services';
import { ListStoreConstructor } from './core/ListStoreConstructor';
import { computed, observable } from "mobx";
import {NFTFactoriesManager} from '../blockchain-bridge/hmy'
import { observer } from "mobx-react";
import {ipfsGateway} from "../services/ipfs/ipfsClient";
import {cache} from '../services/cache'

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
  cache = cache('collections');

  constructor(stores: IStores) {
    this.fetchCollections()
  }

  fetchCollections = async () => {
    const cachedCollection = this.cache.getAll()
    const cachedCollectionArr = Object.values(cachedCollection)
    const cachedCollectionAddresses = Object.keys(cachedCollection)

    const collectionsAddresses = await NFTFactoriesManager.getAllCollections()

    const collectionsWithoutCached = collectionsAddresses
      .filter(({address}) => !cachedCollectionAddresses.includes(address))

    const collectionsWithContractUri = await Promise.all(collectionsWithoutCached.map(async e => {
      if (e.type==='721') {
        return { ...e, contractURI: (await NFTFactoriesManager.getHRC721ContractURI(e.address))}
      }
      return {...e, contractURI: (await NFTFactoriesManager.getHRC1155ContractURI(e.address))}
    }))

    const collectionsWithMeta = await Promise.all(collectionsWithContractUri.map(async e => {
      const meta = await fetch(`${ipfsGateway}/${e.contractURI}`).then(r=>r.json())
      const image = `${ipfsGateway}/${meta.image}`
      const collection = {...e, ...meta, image}
      this.cache.set(e.address, collection)

      return collection
    }))

    // todo sort
    this.collectionsList = [...collectionsWithMeta, ...cachedCollectionArr]
  }

  @computed get collections() {
    return this.collectionsList
  }
}
