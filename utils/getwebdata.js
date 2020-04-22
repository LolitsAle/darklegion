const path = require('path')
const fs = require('fs')

const rawData = fs.readFileSync(path.join(__dirname, '../webconfig.json'))
const webData = JSON.parse(rawData)

module.exports = webData
