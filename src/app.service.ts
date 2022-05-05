import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
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
      console.dir(accounts);

      // Get balance
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log(`balance : ${balance}`);

      /* // Get fromWei
      web3.eth.getBalance(accounts[0], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const wei = await web3.utils.fromWei(result, 'ether');
          console.log(wei + ' ETH');
        }
      }); */
    }
    return null;
  }
}
