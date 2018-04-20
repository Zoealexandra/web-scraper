const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

app.get('/scrape', function (req, res) {
  let url = 'http://www.imdb.com/title/tt1229340/'

  request(url, function (error, response, html) {
    const json = {title: '', release: '', rating: ''}

    if (!error) {
      let $ = cheerio.load(html)

      let title, release, rating

      $('.header').filter(function () {
        let data = $(this)
        title = data.children().first().text()

        release = data.children().last().children().text()

        json.title = title
        json.release = release
      })

      // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

      $('.star-box-giga-star').filter(function () {
        let data = $(this)

        // The .star-box-giga-star class was exactly where we wanted it to be.
        // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

        rating = data.text()

        json.rating = rating
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
      // eslint-disable-next-line no-console
      console.log('File successfully written! - Check your project directory for the output.json file')(err)
    })

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')
  })
})

app.listen('8081')
// eslint-disable-next-line no-console
console.log('Magic happens on port 8081')

exports = module.exports = app
