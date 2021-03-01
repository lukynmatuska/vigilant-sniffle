const fs = require('fs')
const sax = require('./sax')

function saxF() {
    console.log('SAX:')
    let dataInXML = fs.readFileSync('./ovoce.xml')
    sax.parseString(dataInXML)
}

function domF() {
    console.log('DOM:')
    const dom = require('./dom')
    dom.students()
    dom.fruit()
}

try {
    domF()
    saxF()
} catch (err) {
    console.error(err)
}