// index.js
// Propsed architecture
// - [x] parser: unpacks each instruction into its underlying field
// - [ ] code: translates each field into its corresponding binary value
// - [ ] symboltable: manages the symbol table
// - [ ] main: initializes the i/o and drives the process
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const args = process.argv.slice(2)
const log = console.log
const { Parser } = require('./models')
// TEST
const test_file = '../add/Add.asm'
const file = path.join(__dirname, test_file)
// read as text file
const fileAs = 'utf8'


const main = () => {
  const asmText = fs.readFileSync(file, fileAs)
  // first parse into a manageable, cleaned-up list of instructions
  const parser = new Parser(asmText)
  process.exit(0)
}

main()
