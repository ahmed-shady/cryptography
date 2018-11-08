/* holds the last changed text area */
var lastChanged;

// get all inputs and buttons to work with them!
var plain = document.getElementById('plain');
var cipher = document.getElementById('cipher');
var key = document.getElementById('key');
var clear = document.querySelector('input[type=button]');
var indication = document.getElementById('indication');
var select = document.getElementById('algorithm');

//array of algorithms used
var algorithms = [Caeser, playfair];
lastChanged = plain;

/* clear both plain and cipher if clear button clicked */
clear.onclick = function(event) {
  cipher.value = plain.value = "";
}


cipher.oninput = plain.oninput = key.oninput = function(event) {


  if (event.target !== key)
    lastChanged = event.target;

  /* check that key is entered */

  if (!key.value) {
    indication.textContent = "key must be entered!";
    return;
  }

  indication.textContent = "";

  //create an algorithm method object

  var algo = new algorithms[select.value]();
  /* encrypt or decrypt */
  if (lastChanged === plain)
    cipher.value = algo.encrypt(plain.value, key.value);
  else
    plain.value = algo.decrypt(cipher.value, plain.value);

}

// clear everything when another algorithm is selected
select.onchange = () => {
  cipher.value = plain.value = key.value = "";
}