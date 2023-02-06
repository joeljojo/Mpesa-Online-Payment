const axios = require('axios');
require('dotenv').config();
const authenticationTocken = require('../Middlewares/accessTocken');
const getCurrentTimeStamp = require('../Utils/timestamp');

class Mpesa {
  async lipaNaMpesaOnline(req, res) {
    let token = authenticationTocken();
    let auth = `Bearer ${token}`;

    //get the timestamp
    let timestamp = getCurrentTimeStamp();
    let url = process.env.LIPA_NA_MPESA_URL;
    let businessShortCode = process.env.BUSINESS_SHORT_CODE;
    let passKey = process.env.PASS_KEY;
    let password = new Buffer.from(
      `${businessShortCode}${passKey}${timestamp}`
    ).toString('base64');
    let transactionType = 'CustomerPayBillOnline';
    let amount = 1; //Amount to be transacted
    let partyA = process.env.PHONE_NUMBER; // Phone number sending money
    let partyB = process.env.BUSINESS_SHORT_CODE; //Organization receiving funds
    let phoneNumber = process.env.PHONE_NUMBER; //Mobile number to receive STK Pin Prompt
    let callBackUrl = process.env.CALLBACK_URL; // used to receive noification from M-Pesa API
    let accountReference = 'Shop Online'; //identifier of the transaction
    let transactionDescription = 'lipa matunda'; // addtional information

    try {
      let { data } = await axios.post(
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
      );
      console.log(data);
      // return { success: true, message: data };
    } catch (error) {
      throw err;
    }
  }

  async lipaNaMpesaCallBack(req, res) {
    // getting transaction description
    let message = req.body.Body.stkCallback.ResultDesc;
    return message;
  }
}

module.exports = new Mpesa();
