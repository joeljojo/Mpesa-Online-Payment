const axios = require('axios');
require('dotenv').config();
const getCurrentTimeStamp = require('../Utils/timestamp');

class MpesaApi {
  async authenticationTocken(req, res, next) {
    let consumer_key = process.env.CONSUMER_KEY;
    let consumer_secret = process.env.CONSUMER_SECRET;

    let url = process.env.OAUTH_TOCKEN_URL;

    //from the secret and and consumer key
    let buffer = Buffer.from(consumer_key + ':' + consumer_secret);
    let auth = `Basic ${buffer.toString('base64')}`;

    try {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });
      req.token = data.access_token;
      return next();
    } catch (error) {
      return res.send({
        success: false,
        message: err.response.statusText,
      });
    }
  }
  async lipaNaMpesaOnline(req, res) {
    let token = req.token;
    let auth = `Bearer ${token}`;

    //getting the timestamp
    let timestamp = getCurrentTimeStamp();

    let url = process.env.LIPA_NA_MPESA_URL;
    let businessShortCode = process.env.BUSINESS_SHORT_CODE;
    let passKey = process.env.PASS_KEY;

    let password = new Buffer.from(
      `${businessShortCode}${passKey}${timestamp}`
    ).toString('base64');
    let transactionType = 'CustomerPayBillOnline';
    let amount = '1'; //you can enter any amount
    let partyA = process.env.PHONE_NUMBER; //should follow the format:2547xxxxxxxx
    let partyB = process.env.BUSINESS_SHORT_CODE;
    let phoneNumber = process.env.PHONE_NUMBER; //should follow the format:2547xxxxxxxx
    let callBackUrl = `${process.env.CALLBACK_URL}/lipa-na-mpesa-callback`;
    let accountReference = 'Lipa Matunda';
    let transactionDescription = 'Mpesa Online Payment';

    try {
      let { data } = await axios
        .post(
          url,
          {
            BusinessShortCode: businessShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: transactionType,
            Amount: amount,
            PartyA: partyA,
            PartyB: partyB,
            PhoneNumber: phoneNumber,
            CallBackURL: callBackUrl,
            AccountReference: accountReference,
            TransactionDesc: transactionDescription,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .catch(console.log);

      return res.send({
        success: true,
        message: data,
      });
    } catch (err) {
      return res.send({
        success: false,
        message: err['response']['statusText'],
      });
    }
  }

  lipaNaMpesaCallBack(req, res) {
    //Get the transaction description
    let message = req.body.Body.stkCallback['ResultDesc'];

    return res.send({
      success: true,
      message,
    });
  }
}

module.exports = new MpesaApi();
