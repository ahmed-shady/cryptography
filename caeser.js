/* ASCII for letter 'a' and letter 'z' */
const FIRST_CHARACTER = 'a'.charCodeAt(0);
const LAST_CHARACTER = 'z'.charCodeAt(0)

/* size of the alphapet (26 in english) */
const ALPHAPETIC_SIZE = LAST_CHARACTER - FIRST_CHARACTER + 1;


function Caeser() {

}

Caeser.prototype.encrypt = function(plaintext, key) {
  if (!Number(key)) return plaintext;
  return shift(key, plaintext);
}

Caeser.prototype.decrypt = function(ciphertext, key) {
  if (!Number(key)) return plaintext;
  return shift(-1 * key, ciphertext);
}


//key = [0,25]

function editKey(key) {
  //5.5: 5
  key = Math.trunc(key);
  //
  key = key % ALPHAPETIC_SIZE;
  if (key < 0)
    key += ALPHAPETIC_SIZE;
  return key;
}


function shift(key, plaintext) {
  key = editKey(key);

  var ciphertext = "";
  var i;
  var c;

  for (i = 0; i < plaintext.length; i++) {
    c = plaintext.charCodeAt(i); //contains code of the character

    //a-z
    if (isFromAlphapet(c)) {
      c = (c - FIRST_CHARACTER + key) % ALPHAPETIC_SIZE + FIRST_CHARACTER;
    }

    ciphertext += String.fromCharCode(c);
  }

  return ciphertext;

}

function isFromAlphapet(c) {
  return c >= FIRST_CHARACTER && c <= LAST_CHARACTER;
}