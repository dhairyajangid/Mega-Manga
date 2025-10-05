const imageKit = require('imagekit');
const dotenv = require('dotenv');

dotenv.config();
const imageUpload = new imageUpload({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
module.exports = imageKit;