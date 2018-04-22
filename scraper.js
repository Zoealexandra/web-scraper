/* let cheerio = require('cheerio')
let jsonframe = require('jsonframe-cheerio')

let $ = cheerio.load('https://gist.githubusercontent.com/gahabeen/8a7110fbc7d5b14032de46a75768bb7c/raw/83a122fd8dbff52c176235be9063185afeb6191c/index.html')
jsonframe($) // initializes the plugin

let frame = {
  'companies': { // setting the parent item as "companies"
    'selector': '.item', // defines the elements to search for
    'data': [{ // "data": [{}] defines a list of items
      'name': '.header [itemprop=name]', // inline selector defining "name" so "company"."name"
      'description': '.header [rel=description]', // inline selector defining "description" as "company"."description"
      'url': { // defining "url" by an attribute with "attr" and "selector" in an object
        'selector': '.header [itemprop=name]', // is actually the same as the inline selector
        'attr': 'href' // the attribute name to retrieve
      },
      'contact': { // set up a parent "contact" element as "company"."contact"
        'selector': '.contact', // defines the element to search for
        'data': { // defines the data which "contact" will contain
          'telephone': { // using "type" to use "telephone" parser to extract only the telephone
            'selector': '[itemprop=telephone]', // simple selector for "telephone"
            'type': 'telephone' // using "telephone" plugin parser
          },
          'employee': { // setting a parent node "employee" as "company"."contact"."employee"
            'name': '[itemprop=employeeName]', // inline selector defining "name"
            'jobTitle': '[itemprop=employeeJobTitle]', // inline selector defining "jobtitle"
            'email': { // using "type" to use "email" parser to extract only the email
              'selector': '[itemprop=email]', // simple selector for "email"
              'type': 'email' // using "email" plugin parser
            }
          }
        }
      }
    }]
  }

}

let companiesList = $('body').scrape(frame)
// eslint-disable-next-line no-console
console.log(companiesList) // Output the data in the terminal */
