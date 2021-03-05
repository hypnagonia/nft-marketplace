import { Harmony } from "@harmony-js/core";
import { connectToOneWallet } from "./helpers";
import { mulDecimals } from "../../utils";
import { web3 } from "../eth";
import erc721json from "../../abi/DavinciToken.json";
import hrc721Factory from "../../abi/DavinciTokenFactory.json";
import hrc1155Factory from "../../abi/DavinciMultipleTokenFactory.json";
import hrc721Token from "../../abi/DavinciToken.json";
import hrc1155Token from "../../abi/DavinciMultipleToken.json";

import { ipfsGateway } from "../../services/ipfs/ipfsClient";

const BN = require("bn.js");

const defaultBaseUrl = ipfsGateway;

interface InitParams {
  hmy: Harmony;
  options?: { gasPrice: number; gasLimit: number };
}

export class NFTFactory {
  hmy: Harmony;
  private options = { gasPrice: 1000000000, gasLimit: 6721900 };

  constructor(params: InitParams) {
    this.hmy = params.hmy;

    if (params.options) {
      this.options = params.options;
    }
  }

  public deployCollection = type => type === "hrc721"
    ? isMetamask => isMetamask ? this.deployERC721Web3 : this.deployERC721Hmy
    : isMetamask => isMetamask ? this.deployERC1155Web3 : this.deployERC1155Hmy;

  public getAllCollections = async () => {
    const hrc721 = (await this.getAllHRC20Collections())
      .map(address => ({ address, type: "721" }));
    const hrc1155 = (await this.getAllHRC1155Collections())
      .map(address => ({ address, type: "1155" }));

    return [...hrc721, ...hrc1155];
  };

  getAllHRC20Collections = async () => {
    const contract = this.hmy.contracts.createContract(
      hrc721Factory.abi,
      process.env.HRC721_FACTORY
    );

    return await contract.methods.getAllTokens().call();
  };

  getAllHRC1155Collections = async () => {
    const contract = this.hmy.contracts.createContract(
      hrc1155Factory.abi,
      process.env.HRC1155_FACTORY
    );

    return await contract.methods.getAllTokens().call();
  };

  getHRC721ContractURI = async (address) => {
    const contract = this.hmy.contracts.createContract(
      hrc721Token.abi,
      address
    );

    return await contract.methods.contractURI().call();
  };

  getHRC1155ContractURI = async (address) => {
    const contract = this.hmy.contracts.createContract(
      hrc1155Token.abi,
      address
    );

    return await contract.methods.contractURI().call();
  };

  private deployERC721Hmy = (name, symbol, contractURI = defaultBaseUrl, tokenBaseURI = defaultBaseUrl, cb) => {
    return new Promise(async (resolve, reject) => {

      const hmyTokenContract = this.hmy.contracts.createContract(
        hrc721Factory.abi,
        process.env.HRC721_FACTORY
      );

      try {
        // @ts-ignore
        await connectToOneWallet(hmyTokenContract.wallet, null, reject);
        const res = await hmyTokenContract
          .methods
          .createDavinciToken(name, symbol, contractURI, tokenBaseURI)
          .send(this.options)
          .on("transactionHash", cb);

        resolve(res);
      } catch (e) {
        console.log("deployERC721Hmy something wrong", e);
        reject(e);
      }
    });
  };

  private deployERC721Web3 = (name, symbol, contractURI = defaultBaseUrl, tokenBaseURI = defaultBaseUrl, cb) => {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const accounts = await ethereum.enable();
        const erc721Contract = new web3.eth.Contract(erc721json.abi, process.env.HRC721_FACTORY);

        const res = await erc721Contract
          .methods
          .createDavinciToken(name, symbol, contractURI, tokenBaseURI)
          .send({
            from: accounts[0],
            gas: process.env.GAS_LIMIT,
            gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
          })
          .on("transactionHash", cb);

        resolve(res);
      } catch (e) {
        console.log("deployERC721 something wrong", e);
        reject(e);
      }
    });
  };


  private deployERC1155Hmy = (name, symbol, contractURI = defaultBaseUrl, tokenBaseURI = defaultBaseUrl, cb) => {
    return new Promise(async (resolve, reject) => {

      const hmyTokenContract = this.hmy.contracts.createContract(
        hrc1155Factory.abi,
        process.env.HRC1155_FACTORY
      );

      try {
        // @ts-ignore
        await connectToOneWallet(hmyTokenContract.wallet, null, reject);
        const res = await hmyTokenContract
          .methods
          .createDavinciMultipleToken(name, symbol, contractURI, tokenBaseURI)
          .send(this.options)
          .on("transactionHash", cb);

        resolve(res);
      } catch (e) {
        console.log("deployERC721Hmy something wrong", e);
        reject(e);
      }
    });
  };

  private deployERC1155Web3 = (name, symbol, contractURI = defaultBaseUrl, tokenBaseURI = defaultBaseUrl, cb) => {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const accounts = await ethereum.enable();
        const erc721Contract = new web3.eth.Contract(hrc1155Factory.abi, process.env.HRC1155_FACTORY);

        const res = await erc721Contract
          .methods
          .createDavinciMultipleToken(name, symbol, contractURI, tokenBaseURI)
          .send({
            from: accounts[0],
            gas: process.env.GAS_LIMIT,
            gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
          })
          .on("transactionHash", cb);

        resolve(res);
      } catch (e) {
        console.log("deployERC721 something wrong", e);
        reject(e);
      }
    });
  };

}
