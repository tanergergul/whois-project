import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
var userIP = "";

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {

    res.render("index.ejs");
})

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})