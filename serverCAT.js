const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

app.get('/scrape', function (req, res) {
  let url = 'https://www.spcaauckland.org.nz/adopt/dogs/'

  request(url, function (error, response, html) {
    const json = {name: ''}

    if (!error) {
      let $ = cheerio.load(html)

      let animalName = ''
      //eg  let release = ''

      $('.product-grid.row').filter(function () {
        let data = $(this)
        animalName = data.first().next().children().last().children().text()
        // eg. data.children().children().first().next().text()

        json.name = animalName
      })
    }

    fs.writeFile('spcatitle.json', JSON.stringify(json, null, 4), function (err) {
      // eslint-disable-next-line no-console
      return !err ? console.log('File successfully written! - Check your project directory for the output.json file') : null
    })

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')
  })
})

app.listen('8082')
// eslint-disable-next-line no-console
console.log('Magic happens on port 8082')

exports = module.exports = app
