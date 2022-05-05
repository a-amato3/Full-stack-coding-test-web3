import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const abi = require('./assets/abi.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

@Injectable()
export class AppService {
  public async getAddress(): Promise<void> {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545'),
    );
    if (!_.isUndefined(web3)) {
      // Get address
      const accounts = await web3.eth.getAccounts();

      web3.eth.getAccounts().then((e) => {
        const firstAcc = e[0];
        console.log('token_address', firstAcc);
      });

      // Get balance
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log('balance', balance);

      // Get fromWei
      web3.eth.getBalance(accounts[0], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // const wei = await web3.utils.fromWei(result, 'ether');
          // console.log(wei + ' ETH');
        }
      });

      const getTokenName = async () => {
        const tokenAddress = '0x394684c6fdfEDC39ABF7BAf1c482477E8E795b62';

        const token = new web3.eth.Contract(abi, tokenAddress, {
          from: accounts[0],
        });
        await token.methods
          .name()
          .call()
          .then(function (res) {
            console.log(res);
          });
        const tokenSymbol = await token.methods.symbol().call();
        console.log('(' + tokenSymbol + ')');
      };
      getTokenName();
    }
    return null;
  }
}
