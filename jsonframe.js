const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

let $ = cheerio.load('https://www.spcaauckland.org.nz/adopt/small-animals/-cloudy-and-storm/')
jsonframe($) // initialises plugin

let frame = {
  'selector': '.pull-left'

}

const bunnyList = $('.page-title.col-sm-12.clearfix').scrape(frame)
// eslint-disable-next-line no-console
console.log(bunnyList)
