// index.js
// Propsed architecture
// - [x] parser: unpacks each instruction into its underlying field
// - [ ] code: translates each field into its corresponding binary value
// - [x] symboltable: manages the symbol table
// - [x] main: initializes the i/o and drives the process
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const args = process.argv.slice(2)
const log = console.log
const { Parser, SymbolTable, Translator } = require('./models')
// TEST
const test_file = '../add/Add.asm'
const file = path.join(__dirname, test_file)
// read as text file
const fileAs = 'utf8'


const main = () => {
  const asmText = fs.readFileSync(file, fileAs)
  const st = new SymbolTable()
  // first parse into a manageable, cleaned-up list of instructions
  const parser = new Parser(asmText)

  // First PASS
  const labelPairs = parser.labelAddressPairs()
  st.addSymbol(labelPairs)

  // Second PASS
  // memory store initialization at 16
  let n = 16
  const translator = new Translator()
  const withoutLabels = parser.withoutLabels()

  // result hack file
  let hackFile = ''

  // process and translate each line
  withoutLabels.forEach((l, i) => {
    let hackLine = ''
    log('line:', i, l)
    // A-instruction
    if (parser.isAInstruction(l)) {
      const symbolName = parser.symbolName(l)
      let symbolValue
      // first check is symbolName is decimcal constant
      if (parser.symbolIsNumber(symbolName)) {
        symbolValue = parseInt(symbolName)
      } else if (st.hasSymbol(symbolName)) {
        console.log(`${symbolName} is in CACHE`)
        symbolValue = st.valueForSymbol(symbolName)
      } else {
        symbolValue = n
        st.addSymbol({ [symbolName]: n })
        n++
      }
      // pass the finalized symvol value to the translator's
      // utility for a instructions
      hackLine = translator.aInstructToBinary(symbolValue)
    } else {
      // feed entire line to c instruction translation
      hackLine = translator.cInstructToBinary(l)
    }
    hackFile += `${hackLine}\n`
  })

  log('HACKFILE:')
  log(hackFile)

  process.exit(0)
}

main()
