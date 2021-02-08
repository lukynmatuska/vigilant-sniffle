const parseString = require('xml2js').parseString
const fs = require('fs')

let dataInXML = String(fs.readFileSync('./students.xml'))
parseString(dataInXML, function (err, result) {
    if (err) {
        return console.error(err)
    }
    console.log(result)
    fs.writeFileSync('students.json', JSON.stringify(result))
})