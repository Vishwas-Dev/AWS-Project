const express = require("express");
const ip = require("ip");


const app = express();

const PORT = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  return res.json({
    message: "pong",
    serverAddr: ip.address(),
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
