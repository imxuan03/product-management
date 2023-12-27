const express = require('express')

require('dotenv').config()

const database = require("./config/database")
database.connect();
const systemConfig = require("./config/system")

// nhúng vào (import) thì dùng từ khóa require 
// nhúng từ file indexedDB.route.js 
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express()
// port = 3000
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));


//Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//End Variables

// Route 
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})