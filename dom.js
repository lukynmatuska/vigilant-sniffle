const parseString = require('xml2js').parseString
const fs = require('fs')
const Fruit = require('./Fruit')

module.exports.students = () => {
    let dataInXML = String(fs.readFileSync('./students.xml'))
    parseString(dataInXML, function (err, result) {
        if (err) {
            return console.error(err)
        }
        console.log(result)
        fs.writeFileSync('students.json', JSON.stringify(result))
    })
}

module.exports.fruit = () => {
    let dataInXML = String(fs.readFileSync('./ovoce.xml'))
    parseString(dataInXML, function (err, result) {
        if (err) {
            return console.error(err)
        }
        // console.log(result)
        var fruits = []
        for (const ovoce of result.jidlo.ovoce) {
            fruits.push(
                new Fruit(
                    ovoce.nazev[0]._,
                    ovoce.nazev[0].$.jednotkovaCena,
                    ovoce.vaha
                )
            )
        }
        console.log(fruits)
        fs.writeFileSync('ovoce.dom.json', JSON.stringify(fruits))
    })
}