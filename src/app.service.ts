import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ERC20 } from './models/token-interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const abiContract = require('../build/contracts/migrations.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // PASTE NETWORK HERE
@Injectable()
export class AppService {
  public async getAddress(): Promise<void> {
    if (!_.isUndefined(web3)) {
      const accounts = await web3.eth.getAccounts();
      accounts.forEach((account: string): void => {
        this.getAccountDetails(account).then((results: ERC20): void => {
          console.log(results);
        });
      });
    }
    return null;
  }

  private async getAccountDetails(account: string): Promise<ERC20> {
    const tokenAddress = '0x394684c6fdfEDC39ABF7BAf1c482477E8E795b62'; // PASTE TOKEN ADDRESS HERE

    const tokenContract = await new web3.eth.Contract(
      [abiContract],
      tokenAddress,
    );
    const getToken = async (): Promise<any> => {
      return await this.getTokenInfo(tokenContract);
    };

    const getBalance = async (): Promise<void> => {
      return await web3.eth.getBalance(account);
    };

    const token = await getToken();
    const balance = await getBalance();
    return {
      token_address: account,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      balance,
      balance_usd: '2,380.60',
    } as ERC20;
  }

  private async getTokenInfo(tokenContract): Promise<any> {
    const [name, symbol, decimals] = await Promise.all([
      tokenContract.methods.name().call(),
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
    ]);
    return { decimals, name, symbol };
  }
}
