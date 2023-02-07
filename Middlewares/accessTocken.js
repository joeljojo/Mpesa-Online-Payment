// const axios = require('axios');
// require('dotenv').config();

// const authenticationTocken = async (req, res, next) => {
//   let consumer_key = process.env.CONSUMER_KEY;
//   let consumer_secret = process.env.CONSUMER_SECRET;

//   let url = process.env.OAUTH_TOCKEN_URL;

//   //from the secret and and consumer key
//   let buffer = Buffer.from(consumer_key + ':' + consumer_secret);
//   let auth = `Basic ${buffer.toString('base64')}`;

//   try {
//     let { data } = await axios.get(url, {
//       headers: {
//         Authorization: auth,
//       },
//     });
//     let token = data.access_token;
//     return token;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { authenticationTocken };
