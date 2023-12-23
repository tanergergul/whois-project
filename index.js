import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
var userIP = "";
const API_URL = "https://scraper.run/"

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    try{
        const response = await axios.get(API_URL + "ip");
        var ip = response.data;
        userIP = ip.addr;
        ip.code = ip.code.toLowerCase();

        res.render("index.ejs",{
            ip:ip
        });
    } catch (error){
        console.log(error);
        res.status(500);
    }
})

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})