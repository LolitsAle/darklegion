const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const bodyParser = require('body-parser')

const charger = require('../utils/chargeapi')
const { exPort , pointsfactor } = require('../webconfig.json')
const mcserver = require('../survival_server/server.js') 


const app = express()

const port = process.env.PORT || exPort
const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

//run server
require('../survival_server/runserver')

//api ----------------------------- ZONE -------------------------

app.post('/trans', async (req, res) => {
    // get data from req.query
    const card = req.query.card
    const price = req.query.price
    const seri = req.query.seri
    const code = req.query.code
    const account = req.query.content

    console.log(card)
    console.log(account)
    mcserver.givepoints(account, 10000)

    charger(code , seri, card, price, account , (err, data) =>{
        res.send(JSON.parse(data)) 
    })
    
})

//setup api get data from thesieutoc.net
app.post('/thesieutoc', (req, res) => {

    const body = req.body

    if(body.status == "thanhcong"){
        const account = body.content
        const points = int32.parse(body.amount) * pointsfactor
    
        mcserver.givepoints(account, points)
        //hiện cửa sổ thông báo cho user biết thẻ nạp thành công
        res.status(200).send()
    }else{
        //hiện cửa sổ thông báo cho user biết thẻ nạp thất bại
        res.status(200).send()
    }
})

// GET request to get the data from _storage.json
app.get('/data', (req, res) => {

    const rawdata = fs.readFileSync(path.join(__dirname, '../_storage.json')).toString()
    const info = fs.readFileSync(path.join(__dirname, '../info.txt')).toString()
    
    const data = JSON.parse(rawdata)

    res.send({data ,info})
})


//Test: let the server call a example command when someone is access the website
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('server is running on port: ' + port)
    console.log('link: http://localhost:'+ port)
})