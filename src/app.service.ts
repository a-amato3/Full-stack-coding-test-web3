import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ERC20 } from './models/token-interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const abi = require('./assets/abi.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // PASTE NETWORK HERE
@Injectable()
export class AppService {
  public async getAddress(): Promise<void> {
    if (!_.isUndefined(web3)) {
      const accounts = await web3.eth.getAccounts();
      accounts.forEach((account: any): void => {
        this.getAccountDetails(account);
      });
    }
    return null;
  }

  private async getAccountDetails(account: any): Promise<void> {
    const tokenAddress = '0x394684c6fdfEDC39ABF7BAf1c482477E8E795b62'; // PASTE TOKEN ADDRESS HERE

    const tokenContract = new web3.eth.Contract(abi, tokenAddress);
    this.getTokenInfo(tokenContract);

    const getBalance = async (): Promise<void> => {
      return await web3.eth.getBalance(account);
    };
    getBalance().then((balanceWallet): void => {
      const address = [];
      address.push({
        token_address: account,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 8,
        balance: balanceWallet,
        balance_usd: '2,698.17',
      } as ERC20);
      console.log(address);
    });
  }

  private async getTokenInfo(tokenContract) {
    const [decimals, name, symbol] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
      tokenContract.methods.name().call(),
    ]);
    return { decimals, name, symbol };
  }
}
