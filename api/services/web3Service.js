
var Web3 = require('web3');

console.log("Ethereum rpc node:",sails.config.ethereum.url);
var web3= new Web3(sails.config.ethereum.url);
console.log("Ethereum address=",web3.eth.accounts.privateKeyToAccount(sails.config.ethereum.key).address, "  private key=",sails.config.ethereum.key);




web3.eth.getTransactionCount( web3.eth.accounts.privateKeyToAccount(sails.config.ethereum.key).address,
    function(err, cnt ) {
      if(err) {
          sails.config.ethereum.txCount = 0;
          console.error("Error set tx count");
          return;
      }
        console.log("Start tx count:",cnt);
        sails.config.ethereum.txCount = cnt;
    }
   );

module.exports = web3;


