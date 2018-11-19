var Web3 = require('web3');

var web3= new Web3('http://94.130.94.163:8545');


// console.log(web3.eth.accounts.privateKeyToAccount('0x3058b9c5d64875a0be96d04b3a744fd380600ed507673931397c6111bbec8ecf'));

var send = async function send(to, key,amount ) {

  var tx = await  web3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: Web3.utils.toWei(amount),
    gas: 21000,
    gasPrice: '0',
    // nonce: 1,

  }, key);

  var details = web3.eth.sendSignedTransaction(tx.rawTransaction);
  await details;

   return details;
  // return await tx.rawTransaction;

}

try {
  //console.log(send('0xab8C4D09F9183e38F96fA43877c67f0b0fD2310E', '0x3058b9c5d64875a0be96d04b3a744fd380600ed507673931397c6111bbec8ecf', '0.01'));
  // 0x013395f0614B6be2C24e33Eb09Fa871c3E5deE4A
   send('0xab8C4D09F9183e38F96fA43877c67f0b0fD2310E', '0xabf758caead2b74629e96998a3fad4a927c5b3bc7faf436f481f9d954491a730', '0.01').then(console.log).catch(console.error)
} catch (e) {
  console.log('Taras Error - '+e);
}


