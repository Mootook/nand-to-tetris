// index.js
// Propsed architecture
// - [x] parser: unpacks each instruction into its underlying field
// - [ ] code: translates each field into its corresponding binary value
// - [x] symboltable: manages the symbol table
// - [x] main: initializes the i/o and drives the process
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const args = process.argv.slice(2)
const log = console.log
const { Parser, SymbolTable, Translator } = require('./models')
// read as text file
const fileAs = 'utf8'


const main = () => {
  if (!args.length) {
    log(chalk.redBright('Please provide a file to translate'))
    process.exit(1)
  }
  const file = path.join(__dirname, `../${args[0]}`)
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
  withoutLabels.forEach(l => {
    let instruction = l.trim()
    let hackLine = ''
    // A-instruction
    if (parser.isAInstruction(instruction)) {
      const symbolName = parser.symbolName(instruction)
      let symbolValue
      // first check is symbolName is decimcal constant
      if (parser.symbolIsNumber(symbolName)) {
        symbolValue = parseInt(symbolName)
      } else if (st.hasSymbol(symbolName)) {
        // then see if we have it in cache
        symbolValue = st.valueForSymbol(symbolName)
      } else {
        // finally assume its a new variable, label
        // add to st
        symbolValue = n
        log(chalk.yellow(`${symbolName} ${n}`))
        st.addSymbol({ [symbolName]: n })
        n++
      }
      // pass the finalized symvol value to the translator's
      // utility for a instructions
      hackLine = translator.aInstructToBinary(symbolValue)
    } else {
      // feed entire line to c instruction translation
      hackLine = translator.cInstructToBinary(instruction)
    }
    hackFile += `${hackLine}\n`
  })
  
  // log and save the file
  log(chalk.greenBright('HACK FILE GENERATED:'))
  log(hackFile)
  const baseFileName = path.basename(file)
  const nWithoutType = baseFileName.substring(0, baseFileName.indexOf('.asm'))
  const destination = `${path.join(__dirname, '../dist')}/${nWithoutType}.hack`
  log(chalk.greenBright('Ouput in: ', destination))
  fs.writeFileSync(destination, hackFile);
  process.exit(0)
}

main()
