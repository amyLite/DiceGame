const express = require('express');
// const mysql = require('mysql');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
// import { CFConfig, CFPaymentGateway, CFEnvironment } from "cashfree-pg-sdk-nodejs";
const CF = require('cashfree-pg-sdk-nodejs')
const app = express();
const UserModel = require('./models/Users');
const TimeModel = require('./models/Time');


app.use(cors());
app.use(express.json())

const CFConfig = CF.CFConfig
const CFEnvironment = CF.CFEnvironment
const CFPaymentGateway = CF.CFPaymentGateway
const CFCustomerDetails = CF.CFCustomerDetails
const CFOrderRequest = CF.CFOrderRequest
var cfConfig = new CFConfig(CFEnvironment.SANDBOX, "2022-01-01", 'TEST10031150ead2ebdc2bc11afaa03705113001', 'TEST4f4b61afa1c8a1c4734e7ba2c6751885fa99712a');



const uri = "mongodb+srv://amarinderhoney11:CyTrixPkU4znmlnM@gameappcluster.2dylwm7.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);

const port = 8080;
const host = '192.168.1.9';
app.listen(port, host, ()=>{
    console.log("listening on port", host, port)
});

app.get('/', (req, res) => {
    UserModel.find({}).sort( { totalMoney: -1 } ).limit(5)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.post("/postTime", (req, res) => {
    TimeModel.create(req.body)
    .then(res => res.json(res))
    .catch(err => res.json(err))
});

app.get("/getTime/:name", (req, res) => {
    const name = req.params.name
    TimeModel.findOne({name:name})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateTime', (req, res) => {
    const name = "time"
    TimeModel.findOneAndUpdate({name:name},{time:req.body.p})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateRandomNumber', (req, res) => {
    const name = "time"
    TimeModel.findOneAndUpdate({name:name},{random1:req.body.randomNUmber1, random2:req.body.randomNUmber2})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/thisUser/:authID", (req, res) => {
    const authID = req.params.authID
    UserModel.findOne({authID:authID})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateMoney/:authID', (req, res) => {
    const authID = req.params.authID
    UserModel.findOneAndUpdate({authID:authID},{plus:req.body.bet})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateNumber/:authID', (req, res) => {
    const authID = req.params.authID
    UserModel.findOneAndUpdate({authID:authID},{numberChosen:req.body.chosenDig})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/addmoney', (req, res) => {
    const headers = {
        "accept": "application/json",
        "x-api-version": "2022-09-01",
        "content-type": "application/json",
        "x-client-id": "TEST10031150ead2ebdc2bc11afaa03705113001",
        "x-client-secret": "TEST4f4b61afa1c8a1c4734e7ba2c6751885fa99712a"
    }

    const data = {
        "customer_details": {
            "customer_id": "7112AAA812234",
            "customer_phone": "9898989898"
        },
        "order_currency": "INR",
        "order_amount": 10.34
    }

    const url = "https://sandbox.cashfree.com/pg/orders"
      
      axios.post(url, data, {
          headers: headers
        })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})



// const db = mysql.createConnection({
//     "host":"localhost",
//     "user":"root",
//     "password":"",
//     "database":"test"
// });

// app.get('/', (req, res) => {
//     res.send("Hello world")
// });

// app.get('/users', (req, res) => {
//     const sql = "SELECT * FROM game_users"
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

// app.put('/update/:email', (req, res) => {
//     const sql = "UPDATE game_users SET `Plus`=? WHERE `Email`=?";
//     const email = req.params.email
//     db.query(sql,[req.body.plus, email], (err, result) => {
//         if (err) return res.json({Message:"Error in posting"});
//         return res.json(result);
//     });

// });

