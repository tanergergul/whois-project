import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";
import requestIp from "request-ip";

const app = express();
const port = 3000;
var userIP = "";
const API_URL = "https://scraper.run/"

app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    userIP = requestIp.getClientIp(req); 

    if(userIP == "::1"){
        userIP = "1.1.1.1"; // for dev enviroment
    }

    try{
        const response = await axios.get(API_URL + "ip?addr=" + userIP);
        var ip = response.data;
        
        ip.code = ip.code.toLowerCase();

        res.render("index.ejs",{
            ip:ip
        });
    } catch (error){
        console.log(error);
        res.status(500);
    }
})

app.get("/ip", async (req,res) => {
    userIP = requestIp.getClientIp(req); 

    if(userIP == "::1"){
        userIP = "1.1.1.1"; // for dev enviroment
    }

    try{
        const response = await axios.get(API_URL + "ip?addr=" + userIP);
        var ip = response.data;

        ip.code = ip.code.toLowerCase();

        res.render("ip.ejs",{
            ip:ip
        });
    } catch (error){
        console.log(error);
        res.status(500);
    }
})

app.post("/ip",async (req,res) => {
    const whoisIP = req.body.whoisIP;

    try{
        const response = await axios.get(API_URL + "ip?addr=" + whoisIP);
        var ip = response.data;
        ip.code = ip.code.toLowerCase();
        console.log("IP Whois: " + JSON.stringify(ip));

        res.render("ip.ejs",{
            ip:ip
        });
    } catch (error){
        console.log(error);
        res.status(500);
    }
})

app.get("/domain", async (req,res) => {
    try{
        const response = await axios.get(API_URL + "whois?addr=google.com");
        var content = response.data;

        res.render("domain.ejs",{
            domain:content.domain,
            registrar:content.registrar,
            registrant:content.registrant,
            administrative:content.administrative,
            technical:content.technical
        });
    } catch (error){
        console.log(error);
        res.render("domain.ejs");
    }
})

app.post("/domain",async (req,res) => {
    const whoisDomain = req.body.whoisDomain;

    try{
        const response = await axios.get(API_URL + "whois?addr=" + whoisDomain);
        var content = response.data;

        console.log("Domain Whois: " + JSON.stringify(content));

        res.render("domain.ejs",{
            domain:content.domain,
            registrar:content.registrar,
            registrant:content.registrant,
            administrative:content.administrative,
            technical:content.technical
        });
    } catch (error){
        console.log(error);
        res.render("domain.ejs");
    }
})

app.get("/email", async (req,res) => {
    try{
        const response = await axios.get(API_URL + "email?addr=example@gmail.com");
        var email = response.data;

        res.render("email.ejs",{
            email:email
        });
    } catch (error){
        console.log(error);
        res.render("email.ejs");
    }
})

app.post("/email",async (req,res) => {
    const whoisEmail = req.body.whoisEmail;

    try{
        const response = await axios.get(API_URL + "email?addr=" + whoisEmail);
        var email = response.data;

        console.log("Email Validation: " + JSON.stringify(email));

        res.render("email.ejs",{
            email:email
        });
    } catch (error){
        console.log(error);
        res.render("email.ejs");
    }
})

app.get("/dns", async (req,res) => {
    try{
        const response = await axios.get(API_URL + "dns?addr=google.com");
        var dns = response.data;

        res.render("dns.ejs",{
            dns:dns
        });
    } catch (error){
        console.log(error);
        res.render("dns.ejs");
    }
})

app.post("/dns",async (req,res) => {
    const whoisDNS = req.body.whoisDNS;

    try{
        const response = await axios.get(API_URL + "dns?addr=" + whoisDNS);
        var dns = response.data;

        console.log("DNS Records: " + JSON.stringify(dns));

        res.render("dns.ejs",{
            dns:dns
        });
    } catch (error){
        console.log(error);
        res.render("dns.ejs");
    }
})

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})