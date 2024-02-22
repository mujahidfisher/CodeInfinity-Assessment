const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("./static"), express.json());

app.listen(PORT, () => {
    console.log(`The server is running on port : ${PORT} 👌`);
  });