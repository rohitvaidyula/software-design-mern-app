const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});