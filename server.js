const express = require("express");
const PORT = 5500 || process.env.PORT;

const app = express();
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
