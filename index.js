const express = require("express");

const routers = require("./router/routes");
var bodyParser = require('body-parser');
const dbConnection = require("./dbconnection");



dbConnection();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routers)

app.listen(3080, () => console.log("Listening on port 3000"));