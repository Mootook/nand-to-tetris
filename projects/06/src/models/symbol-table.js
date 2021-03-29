/**
 *
 */
class SymbolTable {
  /**
   * Object of pre-defined symbol value pairs
   * @type {object}
   */
  static predefined = {
    R0: 0,
    R1: 1,
    R2: 2,
    R3: 3,
    R4: 4,
    R5: 5,
    R6: 6,
    R7: 7,
    R8: 8,
    R9: 9,
    R10: 10,
    R11: 11,
    R12: 12,
    R13: 13,
    R14: 14,
    R15: 15,
    SCREEN: 16384,
    KBD: 24576,
    SP: 0,
    LCL: 1,
    ARG: 2,
    THIS: 3,
    THAT: 4,
    LOOP: 4,
    STOP: 18,
    END: 22,
    i: 16,
    sum: 17
  }

  /**
   * @type {object}
   * object to start symbol value pairs. includes predefined
   * @private
   */
  cache = {}

  /**
   * @returns {boolean} symbol table cache has value for provided symbol
   */
  hasSymbol (s) {
    return this.cache.hasOwnProperty(s)
  }

  /**
   * @returns {number} value for symbol in symbol table cache
   * assumes s is in the table.
   */
  valueForSymbol (s) {
    return this.cache[s]
  }

  /**
   * @param {object} pair
   */
  addSymbol (pair) {
    this.cache = { ...this.cache, ...pair }
  }

  /**
   * @constructor
   */
  constructor () {
    this.cache = {
      ...SymbolTable.predefined
    }
  }
}

module.exports = SymbolTable
