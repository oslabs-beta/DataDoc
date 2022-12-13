const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use("/dist", express.static(path.join(__dirname, '../dist')));
}

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}\n${process.env.NODE_ENV.toUpperCase()} mode`);
});