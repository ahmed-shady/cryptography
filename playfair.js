function playfair(plain, key) {

}
playfair.prototype.encrypt = function(plain, key) {
  key = constructKeyMatrix(key);
  plain = editPlain(plain);
  result = encryptPlayFair(plain, key);
  return result;
}


playfair.prototype.decrypt = function(cipher, key) {
  // not currently supported
  return cipher;
}
/**
*constructKey
*input: Key
*output: key with full alphabet
*steps
1- key = 'ref'
2- key = 'refabcdefghijklm...'
3- key = 'refabcdghi...'
*/

function constructKeyMatrix(key) {
  const alphabet = "abcdefghiklmnopqrstuvwxyz";
  key += alphabet;
  for (let i = 0; i < key.length; i++) {
    // already exists ?!
    //secretabcdefghi...
    if (key.indexOf(key[i]) !== i) {
      key = key.slice(0, i) + key.slice(i + 1); //abcdefghi => abcd + fghi
      i--;
    }

  }
  return key;
}

/*
**editPlain: function
*do 3 things:
1- rr -> rxr
2- rst -> rstx
3- rsjjj -> rsiii
*/
function editPlain(plain) {
  for (let i = 0; i < plain.length - 1; i += 2) {
    if (plain[i] === plain[i + 1])
      plain = plain.slice(0, i + 1) + 'x' + plain.slice(i + 1);
  }

  if (plain.length % 2 === 1) plain += 'x';

  plain = plain.replace(/j/g, 'i'); //regular expression 'g means global '
  return plain;
}

/**
*3 cases:
1- same row
2- same column
3- not 1 or 2
*/

function encryptPlayFair(plaintext, key) {
  var ciphertext = "";
  for (let i = 0; i < plaintext.length - 1; i += 2) {

    var i1, i2, j1, j2;
    // index (1d) --> i = index / 5 , j = index % 5 (2d)
    i1 = key.indexOf(plaintext[i]) / 5 | 0; //integer
    j1 = key.indexOf(plaintext[i]) % 5;

    i2 = key.indexOf(plaintext[i + 1]) / 5 | 0; //integer
    j2 = key.indexOf(plaintext[i + 1]) % 5;

    //same row
    if (i1 == i2)
      // i1, (j1 + 1) % 5 and i2, (j2 + 1) % 5
      ciphertext += key[i1 * 5 + (j1 + 1) % 5] + key[i2 * 5 + (j2 + 1) % 5];

    //same column
    else if (j1 == j2)
      //(i1 + 1) % 5, j1 and (i2 + 1) % 5, j2
      ciphertext += key[((i1 + 1) % 5) * 5 + j1] + key[((i2 + 1) % 5) * 5 + j2];

    else
      // i1, j2 and i2, j1
      ciphertext += key[i1 * 5 + j2] + key[i2 * 5 + j1];
  }
  return ciphertext;
}