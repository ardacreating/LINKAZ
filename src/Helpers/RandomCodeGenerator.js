function getRandomCode() {
  let code = "";
  let dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 8; i++) {
    code = code + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  return code;
};

module.exports = { getRandomCode };