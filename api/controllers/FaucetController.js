/**
 * FaucetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


// var web3_eth = require('web3-eth');
// var web3 = require('web3');




var Web3 = require('web3');
var web3= new Web3('http://94.130.94.163:8545');
console.log(web3.eth.accounts.privateKeyToAccount(sails.config.ethereum.key));


var key =  sails.config.ethereum.key;




module.exports = {


  /**
   * `FaucetController.get()`
   */
  get: async function (req, res) {


// 0xab8C4D09F9183e38F96fA43877c67f0b0fD2310E
    var addressTo = req.param('address');
    if (!web3.utils.isAddress(addressTo)) {
      return res.forbidden();
    }

    console.log("Txcount:",sails.config.ethereum.txCount);
    // console.log("Txcount:",txcount+1);

    var tx = await  web3.eth.accounts.signTransaction({
      to: addressTo,
      value: Web3.utils.toWei('0.1024'),
      gas: 22000,
      gasPrice: '1',
      nonce: sails.config.ethereum.txCount++,

    }, key );

      var sendPromise = await web3.eth.sendSignedTransaction(tx.rawTransaction);

      // sendPromise.once('transactionHash', function(hash){ console.log('transactionHash') })
      // sendPromise.once('receipt', function(receipt){ console.log('receipt') })
      // sendPromise.on('confirmation', function(confNumber, receipt){ console.log('confirmation') })
      // sendPromise.on('error', function(error){ console.log('error') })
      // sendPromise.then(function(receipt){
      //     // will be fired once the receipt is mined
      //   console.log('then')
      //   });
      // sendPromise.catch( function(error){ console.log('catch') });

      return res.json(web3.utils.sha3(tx.rawTransaction));

  },
  /**
   * `FaucetController.status()`
   */
  status: async function (req, res) {
    return res.json({
      faucet_key: sails.config.faucet_key,
      faucet_rpc_url: sails.config.faucet_rpc_url,
      faucet_account: web3_eth.accounts.privateKeyToAccount(sails.config.faucet_key),
    });
  },

  contract: async function (req, res) {


    var addressTo = req.param('address');
    if (!web3.utils.isAddress(addressTo)) {
      return res.forbidden();
    }

    console.log("Txcount:",sails.config.ethereum.txCount);


    var contractAddress = sails.config.ethereum.faucet.address;  ;

    var abi = sails.config.ethereum.faucet.abi;



    var MyContract = new web3Service.eth.Contract(abi, contractAddress);
    var encoded_abi = MyContract.methods.transfer(addressTo,2).encodeABI();


    var tx = await  web3Service.eth.accounts.signTransaction({
      to: contractAddress,
      value: Web3.utils.toWei('0'),
      gas: 220000,
      gasPrice: '1',
      nonce: sails.config.ethereum.txCount++,
      data: encoded_abi
    }, key );

    var sendPromise = await  web3Service.eth.sendSignedTransaction(tx.rawTransaction);


    return res.json(sendPromise);
  },




  giveme: async function (req, res) {

    var addressTo = req.param('address');
    if (!web3.utils.isAddress(addressTo)) {
      return res.forbidden();
    }

    var contractAddress = sails.config.ethereum.faucet.address;
    var abi = sails.config.ethereum.faucet.abi;
    var MyContract = new web3Service.eth.Contract(abi, contractAddress);


    var r = await web3.eth.accounts.signTransaction({
      to: addressTo,
      value: Web3.utils.toWei('1'),
      gas: 22000,
      gasPrice: '1',
      nonce: sails.config.ethereum.txCount++,

    }, key )
      .then(tx => web3.eth.sendSignedTransaction(tx.rawTransaction))
      .then(() => web3Service.eth.accounts.signTransaction({
        to: contractAddress,
        value: Web3.utils.toWei('0'),
        gas: 220000,
        gasPrice: '1',
        nonce: sails.config.ethereum.txCount++,
        data: MyContract.methods.transfer(addressTo,1).encodeABI()
      }, key ))
      .then(tx => web3Service.eth.sendSignedTransaction(tx.rawTransaction))
      .then(console.log)
      .catch(console.error) ;
    res.json({});
  }

  };

