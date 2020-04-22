const path = require('path')
const express = require('express')
const hbs = require('hbs')
const charger = require('../utils/chargeapi')
const { exPort } = require('../webconfig.json')
const fs = require('fs')
const bodyParser = require('body-parser')


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

app.post('/trans', async (req, res) => {
    // get data from req.query
    const card = req.query.card
    const price = req.query.price
    const seri = req.query.seri
    const code = req.query.code

    console.log(card)

    charger(code , seri, card, price, 'just testing' , (err, data) =>{
        res.send(JSON.parse(data)) 
    })
})

//setup api get data from thesieutoc.net
app.post('/thesieutoc', (req, res) => {
    const data = {}
    data.body = req.body
    data.headers = req.headers
    data.query = req.query

    console.log(req)
    
    fs.writeFile(path.join(__dirname, '../_storage.json'), JSON.stringify(data) , (e) => {
        if (e) throw e
    })

    fs.writeFile(path.join(__dirname, '../info.txt'), 'api called' , (e) => {
        if (e) throw e
    })
    res.status(200).send()
})

// GET request to get the data from _storage.json
app.get('/data', (req, res) => {
    const rawdata = fs.readFileSync(path.join(__dirname, '../_storage.json')).toString()
    const info = fs.readFileSync(path.join(__dirname, '../info.txt')).toString()
    
    const data = JSON.parse(rawdata)

    res.send({data ,info})
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('server is running on port: ' + port)
    console.log('link: http://localhost:'+ port)
})