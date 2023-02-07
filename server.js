const express = require('express');
const PORT = 5500 || process.env.PORT;

const app = express();
const mpesaRoutes = require('./Routes/routes');
app.use('/mpesa', mpesaRoutes);
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
