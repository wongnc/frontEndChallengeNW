//capitalize function injected into fields.js

String.prototype.capitalize = function() {
  const keys = Object.keys(this);
  let string = keys.map(key => this[key]);
  string[0] = string[0].toUpperCase();
  return string.join("")
};

