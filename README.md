  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Instructions

Please make sure you have Node js installed first and then install NestJS on your machine to run this project. To connect the smart contract to a network, you will need to have Ganache (download at: https://trufflesuite.com/ganache/). Please complete the setup of the software to have a node setup on your local instance to which the NestJS backend can connect to.

Go to the App Service file in the project and add your environment variables as instructed via the comments (Ganache is set up on http://localhost:7545 as default.) You will need to retrieve your address from the Transactions tab to use where the comment asks for the Token address to be pasted.

## Problems and solutions

- The Learning curve was the first major issue, although I've interacted with Web3 in different projects. I have not done a full-stack app as comprehensive as this one so it was necessary to spend some time learning and gathering information for a wider context before starting and carrying out the test

- Networks were an issue at the beginning, so I decided to stick with localhost. In the future, I would have a custom URL which would allow Ethereum Mainnet, Polygon and Arbitrum as options.

- To overcome issues and difficulties, I browsed the varying documentation on the web for Web3 technologies. I decided to go with Web3.JS as my main library because the other ones out there (Ethers.js) were not as comprehensive.

## Reasoning behind technical choices, including trade-offs that could be made

- I used NestJS because I am familiar with the architecture of the framework from using the Angular framework.

- To complete the task I would have retrieved the metadata from the token (Symbol, Name, Decimal) in the getTokenInfo method using Moralis or another 3rd party lib. Using the abi from the smart contract generated from truffle did not allow me to call methods as per the documentation which should have returned metadata from the token. The getTokenInfo method has the methods that i tried to implement commented out and hardcoded values to showcase what the final response would look like.

- Would have used perhaps a differnt 3rd party lib such as Moralis to get the metadata of token in an easier way or Ethers.js.

- I would have completed the test to a more advanced level by allowing more time to read through documentation and decide on the best 3rd party lib to go with

- The use of a FE in React to display the json object in a well designed list would also make the app more complete.
