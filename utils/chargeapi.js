const request = require('request')
const { apikey } = require('../utils/getwebdata')

const napthe = (mathe, seri, loaithe, menhgia, content, callback) => {
    const url = 'https://thesieutoc.net/chargingws/v2?APIkey=' + apikey + '&mathe='+ mathe +'&seri=' + seri + '&type=' + loaithe + '&menhgia=' + menhgia + '&content=' + content

    request(url,{} ,(err, response) => {
        callback(err, response.body)
    }) 
}

module.exports = napthe