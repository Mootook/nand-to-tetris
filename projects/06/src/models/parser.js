/**
 * Manages the parsing of text file (assembly), generating
 * list of clean, trimmed instructions.
 */
class Parser {
  /**
   * @type {string}
   * @private
   */
  raw

  /**
   * Returns raw asm-text file as array, with each line as index.
   * @returns {Array<string>}
   */
  rawLines () {
    return this.raw.split(/\r?\n/)
  }

  /**
   * @param {string} l line of instruction
   * @returns {boolean}
   * @private
   */
  isInstruction (l) {
    const trimmed = l.trim()
    return !!(!trimmed.startsWith('//') && trimmed !== '') 
  }

  /**
   * @param {string} l single line of asm text file
   * @returns {string} instruction line parsed of comments and white-space
   * @private
   */
  cleanLine (l) {
    let ret = l
    if (ret.includes('//')) {
      ret = ret.substring(0, ret.indexOf('//') - 1)
    }
    return ret // stub
  }

  /**
   * Filters and cleans lines.
   * @returns {Array<string>} clean list of instructions without whitespace or commenst.
   */
  instructionLines () {
    const filteredLines = this.rawLines().filter(this.isInstruction)
    const cleanedLines = filteredLines.map(this.cleanLine) 
    return cleanedLines
  }

  /**
   * @returns {Array<string>} instruction list without label
   */
  withoutLabels () {
    return this.instructionLines().filter(l => !this.isLabel(l))
  }

  /**
   * determinant if the given instruction line is a label
   * @returns {boolen}
   * @private
   */
  isLabel (l) {
    return !!(l.includes('('))
  }

  /**
   * @private
   */
  removeLabelDirective (l) {
    return l.replace('(', '').replace(')', '')
  }

  /**
   * Parses claeaned instructionLines and generates an object, keyed
   * by user-specified label name. value is the address (index) of the next instruction.
   * A label is determined by the () directive.
   * @@returns {object}
   */
  labelAddressPairs () {
    const lines = this.instructionLines()
    let ret = {}
    lines.forEach((l, i) => {
      if (this.isLabel(l)) {
        // store the next instruction
        // don't append to account for the purge of the labels
        // in final machine code
        ret[this.removeLabelDirective(l)] = i
      }
    })
    return ret
  }

  /**
   *
   */
  symbolIsNumber (s) {
    return !isNaN(s)
  }

  /**
   *
   */
  isAInstruction (l) {
    return !!(l.startsWith('@'))
  }

  /**
   * @returns {string} symbol purged of '@' directive
   */
  symbolName (l) {
    return l.replace('@', '')
  }

  /**
   * @constructor
   * @param {string} rawText
   */
  constructor (rawText) {
    this.raw = rawText
  }
}
module.exports = Parser
