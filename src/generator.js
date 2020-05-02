import { isValidPrivate, privateToAddress } from 'ethereumjs-util';
import secp256k1 from 'secp256k1';
import keccak from 'keccak';
import * as Comlink from 'comlink';
import randomBytes from 'randombytes';

function generate(callback) {
  while(true) {
    const randbytes = randomBytes(32);
    if(isValidPrivate(randbytes)) {
      callback(privateToAddress(randbytes).toString('hex'));
    }
  }
}

Comlink.expose(generate);