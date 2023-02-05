const sha256 = require("crypto-js/sha256");

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')

function reverseHex(hex) {
    return hex.match(/.{1,2}/g).reverse().join('');
  }

// function parseHex(hex){
//     var bin = [], i, c, isEmpty = 1, buffer;
//     for(i = 0; i < hex.length; i++){
//         c = hex.charCodeAt(i);
//         if(c > 47 && c < 58 || c > 64 && c < 71 || c > 96 && c < 103){
//             buffer = buffer << 4 ^ (c > 64 ? c + 9 : c) & 15;
//             if(isEmpty ^= 1){
//                 bin.push(buffer & 0xff);
//             }
//         }
//     }
//     return bin;
// }

// function reverseBytes(n) {
//   return ((n & 0xFF) << 24) | ((n & 0xFF00) << 8) | ((n >> 8) & 0xFF00) | ((n >> 24) & 0xFF);
// }

// Settings
const target = '000006a93b3000000000000000000000000000000000000000000';

// Block Header
const version    = '01';
const prevblock  = '0000000000000b60bc96a44724fd72daf9b92cf8ad00510b5224c6253ac40095'
const merkleroot = '0e60651a9934e8f0decd1c5fde39309e48fca0cd1c84a21ddfde95033762d86c'
let time       = '1672979492'
const bits     = '2a6a93b3'
let nonce      = 10060000 // 10070346

function mineBlock(target, header, nonce) {
    let hash = '';
    let candidate = '';
    do {
        nonce++;
        candidtate = header + reverseHex(BigInt(nonce).toString(16)).padEnd(8, '0');
        hash = sha256(candidtate).toString();
        console.log(`${nonce}: ~ hash: \t ${hash}`);
    } while (hash >= target)
    return nonce;
}

// build header
const paddedVersion = version.padEnd(8, '0');
const convertedTime = reverseHex(BigInt(time).toString(16)).padEnd(8, '0');
const header = paddedVersion + reverseHex(prevblock) + reverseHex(merkleroot) + convertedTime + reverseHex(bits);


// display details
const displayMsg = `
1. Get Transactions
-------------------
(lets assume we have 10 transactions)
transactions: 10 

2. Block
--------
version:        ${version}
prevblock:      ${prevblock}
merkleroot:     ${merkleroot}
time:           ${time}
bits:           ${bits}
nonce: (starting) ${nonce}
transactions: not taken into account for this example

header:         ${header}

3. Target
--------- 
${target}
`;
console.log(displayMsg);

// now lets mine!!!
const winningNonce = mineBlock(target, header, nonce);
console.log(`-------`);
console.log(`Congrats We found an accptable none... Block mined!!!`);
console.log(`Successful nonce: ${winningNonce}`);
console.log(`-------`);
console.log(`That was sweet!`);



