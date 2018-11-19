var w3= new Web3('http://94.130.94.163:8545');


var k = '0x3058b9c5d64875a0be96d04b3a744fd380600ed507673931397c6011bbec8ecd';
console.log(w3.eth.accounts.privateKeyToAccount(k));


  w3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: Web3.utils.toWei("0.001"),
    gas: 21000,
    gasPrice: "20000000000",
    nonce: 0

  }, k).then( function (tx) {
    console.log(tx);
    w3.eth.sendSignedTransaction(tx.rawTransaction)
      .then(console.log)
      .catch(console.log)
    ;
  });


