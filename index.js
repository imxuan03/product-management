const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path');

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

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// flash 
app.use(cookieParser('NHAKDLZNX'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end flash 
// TinyMCE 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//End TinyMCE 

app.use(express.static(`${__dirname}/public`));

// dùng cho phần change status, bằng phương thức PATCH
// https://www.npmjs.com/package/method-override
// override with POST having ?_method=PATCH
app.use(methodOverride('_method'))


// parse application/x-www-form-urlencoded
//https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({ extended: false }))

//Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//End Variables

// Route 
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})