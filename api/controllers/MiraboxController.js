/**
 * MiraboxController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  status: async function (req, res) {
    return res.json({
      faucet_key: sails.config.faucet_key,
      faucet_rpc_url: sails.config.faucet_rpc_url,
      faucet_account: web3_eth.accounts.privateKeyToAccount(sails.config.faucet_key),
    });
  },


};

