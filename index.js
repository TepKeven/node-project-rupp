const express = require("express");
const routerFront = require("./front/routes")

const app = express();
const port = 3000;

app.use("/",routerFront)
// app.use("/admin",routerBack);

app.listen((port),()=>{
    console.log(`Server is Running on port ${port}`);
})