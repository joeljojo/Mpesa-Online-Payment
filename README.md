# Mpesa-Online-Payment
The project uses Nodejs and Safaricom Lipa na Mpesa Online Payment API (Daraja API)
REQUIREMENTS AND INSTALLING
Install the following 
-express
-axios
-ngrok
-cors
-dotenv
-nodemon
-eslint
The credentials required include
•	Consumer key
•	Consumer secret
•	Pass key
•	Business Short Code
•	Auth URL 
•	Lipa na MPesa URL
NOTE!! Create .env file in the root directory with the above credentials
The credentials listed above can be found after registering an account at https://developer.safaricom.co.ke/

Installing
To run this project please ensure you have Node.js installed then 
1.	Clone the project by running git clone https://github.com/joeljojo/Mpesa-Online-Payment.git
2.	Move to the root directory and then run npm install

Running
Make a post request to endpoint localhost:5500/mpesa/lipa-na-mpesa
When the request goes successfully, the result will be an STK push as shown below
 
![image](https://user-images.githubusercontent.com/47426915/217219113-f0f68461-b978-4000-9258-8cc8e0610e71.png)
