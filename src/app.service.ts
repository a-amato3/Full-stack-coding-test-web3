import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ERC20 } from './models/token-interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const abiContract = require('../build/contracts/migrations.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // PASTE NETWORK URL HERE (Ganache)
@Injectable()
export class AppService {
  public async getAddress(): Promise<ERC20> {
    if (!_.isUndefined(web3)) {
      this.getAccountDetails().then((result: ERC20[]): void => {
        console.log(result);
      });
    }
    return null;
  }

  private async getAccountDetails(): Promise<ERC20[]> {
    const tokenAddress = '0x394684c6fdfEDC39ABF7BAf1c482477E8E795b62'; // PASTE TOKEN ADDRESS HERE

    const tokenContract = await new web3.eth.Contract(
      [abiContract],
      tokenAddress,
    );
    const getToken = async (): Promise<any> => {
      return await this.getTokenInfo(tokenContract);
    };

    const accounts: [] = await web3.eth.getAccounts();

    const tokenArray: ERC20[] = [];

    for (const account of accounts) {
      const getBalance = async (): Promise<any> => {
        return await web3.eth.getBalance(account);
      };
      const token = await getToken();
      const balance = await getBalance();

      tokenArray.push({
        token_address: account,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        balance,
        balance_usd: balance * 2371,
      } as ERC20);
    }
    return tokenArray;
  }

  private async getTokenInfo(tokenContract): Promise<any> {
    const [name, symbol, decimals] = await Promise.all([
      'Ethereum',
      'ETH',
      18,
      // Meta Data methods to call contract and fetch Name, Symbol, Decimal
      // tokenContract.methods.name().call(),
      // tokenContract.methods.symbol().call(),
      // tokenContract.methods.decimals().call(),
    ]);
    return { decimals, name, symbol };
  }
}
