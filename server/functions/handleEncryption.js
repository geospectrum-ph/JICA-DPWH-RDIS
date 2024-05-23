const crypto = require("crypto");

let algorithm = "aes-256-cbc";
let key = crypto.scryptSync("password", "SEEDs Rebuild", 32);

function encrypt(string) {
  let vector = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), vector);
  let output = cipher.update(string);

  output = Buffer.concat([output, cipher.final()]);

  return ({ data: output.toString("hex"), vector: vector.toString("hex") });
}

function decrypt(object) {
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(object.vector, "hex"));
  let output = decipher.update(Buffer.from(object.data, "hex"));

  output = Buffer.concat([output, decipher.final()]);

  return (output.toString());
}

module.exports = { encrypt, decrypt };