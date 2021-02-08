const xml = require("sax-parser")
const fs = require('fs')
const Fruit = require('./Fruit')

let fruits = []
let fruit = {}
let keyForChars
let price = 0
const sax = new xml.SaxParser((cb) => {
    cb.onStartDocument(() => { })
    cb.onEndDocument(() => {
        console.log(`Summary price of all fruit is ${price}.`)
        try {
            fruits.push(new Fruit(fruit.name, fruit.pricePerPiece, fruit.weight))
            fs.writeFileSync('ovoce.json', JSON.stringify(fruits))
            console.log('File \'ovoce.json\' saved.')
        } catch (err) {
            console.error(err)
        }
    })
    cb.onStartElementNS((elem, attrs, prefix, uri, namespaces) => {
        // console.log(`=> Started: ${elem} uri=${uri} (Attributes: ${JSON.stringify(attrs)})`)
        // console.log(`<${elem} ${uri ? uri : ''} ${JSON.stringify(attrs)}>`)
        switch (elem) {
            case 'ovoce':
                if (Object.keys(fruit).length > 0) {
                    fruits.push(new Fruit(fruit.name, fruit.pricePerPiece, fruit.weight))
                }
                fruit = {}
                break

            case 'cislo':
                fruit.cislo = attrs[0][1]
                break

            case 'nazev':
                keyForChars = 'name'
                fruit.pricePerPiece = attrs[0][1]
                price += Number(fruit.pricePerPiece)
                break

            case 'vaha':
                keyForChars = 'weight'
                break

            default:
                break
        }
        // console.log(fruits)
        // console.log(fruit)
    })
    cb.onEndElementNS((elem, prefix, uri) => {
        // console.log(`<= End: ${elem} uri=${uri}\n`)
        // console.log(`</${elem}>`)
        sax.pause() // pause the parser
        setTimeout(() => {
            sax.resume()
        }, 100) //resume the parser
    })
    cb.onCharacters((chars) => {
        chars = chars.trim()
        if (chars != '') {
            fruit[keyForChars] = chars
            // console.log(`<CHARS>${chars}</CHARS>`)
        }
    })
    /*cb.onCdata((cdata) => {
        console.log("<CDATA>" + cdata + "</CDATA>")
    })
    cb.onComment((msg) => {
        console.log("<COMMENT>" + msg + "</COMMENT>")
    })
    cb.onWarning((msg) => {
        console.log("<WARNING>" + msg + "</WARNING>")
    })
    cb.onError((msg) => {
        console.log("<ERROR>" + JSON.stringify(msg) + "</ERROR>")
    })*/
})
module.exports = sax