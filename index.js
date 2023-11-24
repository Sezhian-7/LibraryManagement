const express = require("express");

const routers = require("./router/routes");
const authRouters = require("./router/auth");

var bodyParser = require('body-parser');
const dbConnection = require("./dbconnection");
const cors = require('cors');



dbConnection();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routers);
app.use('/auth', authRouters);


app.listen(3080, () => console.log("Listening on port 3000"));