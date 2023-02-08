const express = require("express");
var cors = require('cors')
const routerAdmin = require("./routes/routeAdmin");
const routerFront = require("./routes/routeFront");
const path = require("path")
const app = express();
const cookieParser = require("cookie-parser")

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
const port = 4000;

const directory = path.join(__dirname, 'assets/images/');
app.use('/images/', express.static(directory));
  
// http://localhost:4000/api/category
app.use("/api", routerFront);

// http://localhost:4000/api/admin/category
app.use("/api/admin",routerAdmin);

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
