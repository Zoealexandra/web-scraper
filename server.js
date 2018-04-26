const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const server = express()

server.get('/scrape', function (req, res) {
  let url = 'https://www.spcaauckland.org.nz/adopt/small-animals/-cloudy-and-storm/'

  request(url, function (error, response, html) {
    const json = {name: '', animalId: '', age: '', colour: '', breed: '', story: '', bio: ''}

    if (!error) {
      let $ = cheerio.load(html)

      let animalName = ''
      let animalId = ''
      let age = ''
      let colour = ''
      let breed = ''
      let story = ''
      let bio = ''

      $('.page-title.col-sm-12.clearfix').filter(function () {
        let data = $(this)
        animalName = data.first().children().first().text()
        animalId = data.first().children().first().next().text()

        json.name = animalName
        json.animalId = animalId
      })

      $('.product-attributes').filter(function () {
        let data = $(this)
        age = data.children().children().first().children().last().text()
        breed = data.children().children().first().next().children().last().text()
        colour = data.children().children().first().next().next().children().last().text()

        json.age = age
        json.breed = breed
        json.colour = colour
      })

      $('.product-description').filter(function () {
        let data = $(this)
        story = data.children().first().next().text()
        bio = data.children().first().next().next().next().text() + (' ') + data.children().first().next().next().next().next().text()

        json.story = story
        json.bio = bio
      })
    }

    fs.writeFile('spcaoutput.json', JSON.stringify(json, null, 4), function (err) {
      // eslint-disable-next-line no-console
      return !err ? console.log('File successfully written! - Check your project directory for the outputted json file') : null
    })

    // Message confirmed in browser to check your file - no UI
    res.send('Check your console!')
  })
})

server.listen('8080')
// eslint-disable-next-line no-console
console.log('Server listening on port 8080')

exports = module.exports = server
