import { Harmony } from "@harmony-js/core";
import { connectToOneWallet } from "./helpers";
import { mulDecimals } from "../../utils";
import { web3 } from "../eth";
import erc721json from "../../abi/DavinciToken.json";


const BN = require("bn.js");

const defaultBaseUrl = 'https://gateway.pinata.cloud/ipfs/'

interface InitParams {
  hmy: Harmony;
  options?: { gasPrice: number; gasLimit: number };
}

export class DeployNFT {
  hmy: Harmony;
  private options = { gasPrice: 1000000000, gasLimit: 6721900 };

  constructor(params: InitParams) {
    this.hmy = params.hmy;

    if (params.options) {
      this.options = params.options;
    }
  }

  // https://github.com/harmony-one/davinci_nft_marketplace/tree/master/contracts/token
  deployERC721 = isMetamask => isMetamask ? this.deployERC721Web3 : this.deployERC721Hmy;


  private deployERC721Hmy = (name, symbol, contractURI = defaultBaseUrl, baseURI = defaultBaseUrl, tokenURIPrefix = "") => {
    return new Promise(async (resolve, reject) => {
      const hmyTokenContract = this.hmy.contracts.createContract(
        erc721json.abi
      );


      try {
        // @ts-ignore
        await connectToOneWallet(hmyTokenContract.wallet, null, reject);
        const ownerAddress = hmyTokenContract.wallet.defaultSigner

        console.log(hmyTokenContract.wallet, hmyTokenContract.wallet.defaultSigner)


        const res = await hmyTokenContract
          .deploy({
            data: erc721json.bytecode,
            // string memory name, string memory symbol, address newOwner, string memory contractURI, string memory tokenURIPrefix
            arguments: [name, symbol, ownerAddress, contractURI, tokenURIPrefix]
          })
          .send(this.options);


        console.log({ res });
        resolve(res);
      } catch (e) {
        console.log("something wrong", e);
        reject(e);
      }
    });
  };

  private deployERC721Web3 = (name, symbol, contractURI = defaultBaseUrl, baseURI = defaultBaseUrl, tokenURIPrefix = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const accounts = await ethereum.enable();
        const erc721Contract = new web3.eth.Contract(erc721json.abi);
        const ownerAddress = accounts[0]

        const res = await erc721Contract
          .deploy({
            data: erc721json.bytecode,
            arguments: [name, symbol, ownerAddress, contractURI, tokenURIPrefix]
          })
          .send({
            from: accounts[0],
            gas: process.env.GAS_LIMIT,
            gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1))
          });
        resolve(res);
      } catch (e) {
        console.log("something wrong", e);
        reject(e);
      }
    });
  };

}
