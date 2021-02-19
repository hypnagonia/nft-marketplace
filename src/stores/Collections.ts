import { Collection } from './interfaces';
import { IStores } from './index';
import * as services from 'services';
import { ListStoreConstructor } from './core/ListStoreConstructor';
import { computed } from 'mobx';

const initialCollections: Collection[] = [
  {
    name: 'daVinci',
    symbol: 'DAVINCI',
    image: '/davinci.png',
    baseURL: ''
  },
]

export class Collections extends ListStoreConstructor<Collection> {
  constructor(stores: IStores) {
    super(stores, async () => ({content: initialCollections}), {
      pollingInterval: 30000,
      isLocal: true,
      paginationData: { pageSize: 100 },
      sorter: 'totalLockedUSD, asc',
      sorters: {
        name: 'asc',
      },
    });
  }

  @computed get collections() {
    return initialCollections //this.data
  }
}
