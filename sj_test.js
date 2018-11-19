// var Web3 = require('web3');
const sjcl = require('sjcl-all');
const bitcore=require('bitcore-lib');
// var w3= new Web3('ws://94.130.94.163:8546');

// generate 2 random accounts

// const a1 = w3.eth.accounts.create();





const private1 = 'ff36b02e4905648adce5a6a3712307707f4738bea0edc72601409a9cd706a039';// a1.privateKey.slice(2);
console.log("Private key:",private1);
const public1 = new bitcore.PrivateKey(bitcore.crypto.BN.fromString(private1,'hex')).toPublicKey();
console.log("Public key:",public1.toString());
var o1 = public1.toObject();
o1.compressed = false;
console.log("New pub key:",new bitcore.PublicKey(o1).toString())


console.log("");


// const a2 = w3.eth.accounts.create();
const private2 = '4b6cdc3ac3f2f82952c75f1cf0cd84d2e9965f0eaf304a71fd377a9dd185600d'; // a2.privateKey.slice(2);
console.log("Private key:",private2);
const public2 = new bitcore.PrivateKey(bitcore.crypto.BN.fromString(private2,'hex')).toPublicKey();
console.log("Public key:",public2.toString());
var o2 = public2.toObject();
o2.compressed = false;
console.log("New pub key:",new bitcore.PublicKey(o2).toString())
//console.log("04"+ public2.toObject().x + public2.toObject().y);



/* --- start library ---- */


/**
 * Derive shared secret for given private and public keys.
 * @param {Buffer} privateKeyA - Sender's private key (32 bytes)
 * @param {Buffer} publicKeyB - Recipient's public key (65 bytes)
 * @return {Promise.<Buffer>} A promise that resolves with the derived
 * shared secret (Px, 32 bytes) and rejects on bad key.
 */
function derive(privateKeyA, publicKeyB) {
  return new Promise(function(resolve) {
    var secret_key = new sjcl.ecc.elGamal.secretKey(sjcl.ecc.curves.k256,
      sjcl.ecc.curves.k256.field.fromBits(sjcl.codec.hex.toBits(privateKeyA)));
    var pub = new sjcl.ecc.elGamal.publicKey(
      sjcl.ecc.curves.k256,
      sjcl.codec.hex.toBits(publicKeyB.slice(2))
    );


//    resolve(sjcl.codec.hex.fromBits( secret_key.dhJavaEc(pub)));
    resolve(sjcl.codec.hex.fromBits( secret_key.dh(pub)));
  });
}

derive(private1,new bitcore.PublicKey(o2).toString())
  .then(console.log)
  .catch(console.error);


derive(private2,new bitcore.PublicKey(o1).toString())
  .then(console.log)
  .catch(console.error);




var pair1 = sjcl.ecc.elGamal.generateKeys(sjcl.ecc.curves.k256);
var pub1 = pair1.pub.get(), sec1 = pair1.sec.get();
var pair2 = sjcl.ecc.elGamal.generateKeys(sjcl.ecc.curves.k256);
var pub2 = pair2.pub.get(), sec2 = pair2.sec.get();




// Serialized public key:
pub1 = sjcl.codec.base64.fromBits(pub1.x.concat(pub1.y))


// Unserialized public key:
pub1 = new sjcl.ecc.elGamal.publicKey(
  sjcl.ecc.curves.k256,
  sjcl.codec.base64.toBits(pub1)
)


// Serialized private key:
sec1 = sjcl.codec.base64.fromBits(sec1)
// IXkJSpYK3RHRaVrd...

// Unserialized private key:
sec1 = new sjcl.ecc.elGamal.secretKey(
  sjcl.ecc.curves.k256,
  sjcl.ecc.curves.k256.field.fromBits(sjcl.codec.base64.toBits(sec1))
)



// Serialized public key:
pub2 = sjcl.codec.base64.fromBits(pub2.x.concat(pub2.y))


// Unserialized public key:
pub2 = new sjcl.ecc.elGamal.publicKey(
  sjcl.ecc.curves.k256,
  sjcl.codec.base64.toBits(pub2)
)


// Serialized private key:
sec2 = sjcl.codec.base64.fromBits(sec2)
// IXkJSpYK3RHRaVrd...

// Unserialized private key:
sec2 = new sjcl.ecc.elGamal.secretKey(
  sjcl.ecc.curves.k256,
  sjcl.ecc.curves.k256.field.fromBits(sjcl.codec.base64.toBits(sec2))
)


pub2 = new sjcl.ecc.elGamal.publicKey(
  sjcl.ecc.curves.k256,
  sjcl.codec.hex.toBits('2739af64f681d9ffaf3be5b2eeb17b5a6ea3130bf0e6a0061e1f1f306471ca3304016c439bbeee31d0dc601876761b29c3202462aa639e2f969fdfbc527bc5c5')
)



console.log("R1:",sjcl.codec.hex.fromBits( sec1.dh(pub2)))
console.log("R2:",sjcl.codec.hex.fromBits( sec2.dh(pub1)))


var privateKey = new bitcore.PrivateKey();
var publicKey = bitcore.PublicKey(privateKey);
console.log(privateKey.toString());


var encoded = sjcl.encrypt(pair1.pub, privateKey.toString());
console.log("Encoded:",encoded);

var decoded = sjcl.decrypt(pair1.sec, encoded);
console.log("Decoded:",decoded);
