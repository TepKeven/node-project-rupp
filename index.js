const express = require("express");
var cors = require('cors')
const routerAdmin = require("./routes/routeAdmin");
const routerFront = require("./routes/routeFront");
const path = require("path")
const app = express();

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
const port = 4000;
  
// http://localhost:4000/api/category
app.use("/api", routerFront);

// http://localhost:4000/api/admin/category
app.use("/api/admin",routerAdmin);

const directory = path.join(__dirname, 'assets/images/');
app.use('/images/', express.static(directory));


app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});