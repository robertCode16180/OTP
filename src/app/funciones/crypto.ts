
var CryptoJS = require("crypto-js");

export function _encryptData(data: string): string {
        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(data, '1234');
        return ciphertext;
}


function base32tohex(base32: string): string {
    console.log('base32', base32);
    let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";
    for(let i = 0; i < base32.length; i++) {
        let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
    }
    for(let i = 0; i + 4 <= bits.length; i+=4) {
        let chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16) ;
    }
    console.log('base32tohex output ', hex);
    return hex;
}

function leftpad(value: string, length: number, pad: string): string {
    if(length + 1 >= value.length) {
        value = Array(length + 1 - value.length).join(pad) + value;
    }
    return value;
} 
