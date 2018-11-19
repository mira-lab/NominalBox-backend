var Web3 = require('web3');

var web3= new Web3('http://94.130.94.163:8545');

web3.eth.getTransaction('0xfda0228c8f346086442fd39b74bde69d3321e104067778ffdf0ecbd79e3ac375').then(console.log).catch(console.error)
