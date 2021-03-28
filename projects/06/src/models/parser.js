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
   * @returns {Array<string>} clean list of instructions
   */
  instructionLines () {
    const filteredLines = this.rawLines().filter(this.isInstruction)
    const cleanedLines = filteredLines.map(this.cleanLine) 
    return cleanedLines
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
