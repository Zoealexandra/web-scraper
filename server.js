const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

/* app.get('/scrape', function (req, res) {
  const url = 'http://www.imdb.com/title/tt1229340/'

  request(url, function (error, response, html) {
    if (!error) {
      const $ = cheerio.load(html)

      let title = ''
      let release = ''
      let rating = ''
      const json = {title: '', release: '', rating: ''}

      // We'll use the unique header class as a starting point.
      $('.header').filter(function () {
        // Let's store the data we filter into a constiable so we can easily see what's going on.
        let data = $(this)

        // In examining the DOM we notice that the title rests within the first child element of the header tag.
        // Utilizing jQuery we can easily navigate and get the text by writing the following code:
        title = data.children().first().text()

        // Once we have our title, we'll store it to the our json object.
        json.title = title
      })
    }
  })
}) */

app.get('/scrape', function (req, res) {
  let url = 'http://www.imdb.com/title/tt1229340/'

  request(url, function (error, response, html) {
    if (!error) {
      let $ = cheerio.load(html)

      let title, release, rating
      let json = {title: '', release: '', rating: ''}

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
