
const axios = require('axios');

var p = 20

const host = '192.168.1.9:8080'

setInterval(function(){

    p = p-1

    const randomNUmber1 = Math.floor(Math.random() * 6) + 1;
    const randomNUmber2 = Math.floor(Math.random() * 6) + 1;

    axios.put(`http://${host}/updateTime`, {p})
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err));

    if (p<=0){
        p = 20
    }

    if (p===15){
        axios.put(`http://${host}/updateRandomNumber`, {randomNUmber1, randomNUmber2})
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    }

}, 1000)




