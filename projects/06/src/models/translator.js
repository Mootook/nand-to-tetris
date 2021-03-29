/**
 * Manages the conversion of instruciton codes to binary.
 */
class Translator {

  /**
   * @returns {string} 16-bit binary representation of provided number
   */
  aInstructToBinary (i) {
    const binary = i.toString(2).padStart(16, '0')
    return binary
  }

  /**
   * @static
   */
  static DEST = {
    null: '000',
    M: '001',
    D: '010',
    MD: '011',
    A: '100',
    AM: '101',
    AD: '110',
    AMD: '111'
  }

  /**
   * used to key, value pair the j1, j2, j3 of c-instruction
   */
  static JUMP = {
    'null': '000',
    JGT: '001',
    JEQ: '010',
    JGE: '011',
    JLT: '100',
    JNE: '101',
    JLE: '110',
    JMP: '111'
  }

  /**
   * used to key, value pair the a, c1, c2, c3, c4, c5, c6
   * of c-instruction
   */
  static COMP = {
    0: '0101010',
    1: '0111111',
    '-1': '0111010',
    D: '0001100',
    A: '0110000',
    '!D': '0001101',
    '!A': '0110001',
    '-D': '0001111',
    '-A': '0110011',
    'D+1': '0011111',
    'A+1': '0110111',
    'D-1': '0001110',
    'A-1': '0110010',
    'D+A': '0000010',
    'D-A': '0010011',
    'A-D': '0000111',
    'D&A': '0000000',
    'D|A': '0010101',
    M: '1110000',
    '!M': '1110001',
    '-M': '1110011',
    'M+1': '1110111',
    'M-1': '1110010',
    'D+M': '1000010',
    'D-M': '1010011',
    'M-D': '1000111',
    'D&M': '1000000',
    'D|M': '1010101'
  }

  /**
   * @param {string} l instruction
   * @returns {string} 16-bit binary representation of provided instruction
   */
  cInstructToBinary (i) {
    // slowly trim away at a copy
    // of the provided instrucion
    // as we convert and store the binary
    // translation in binary variable
    let trimmedI = i
    // c-instructions begin with 111
    // dest is the lval of the provided instruction
    let binary = '111'
    // binary representations of the three components of a c-instruction
    let destB, compB, jumpB
    // keys for the assembly representations of c-instrucion components
    let destK, compK, jumpK

    if (trimmedI.includes('='))  {
      // we store the value
      destK = trimmedI.substring(0, i.indexOf('='))
      trimmedI = trimmedI.substring(trimmedI.indexOf('=') + 1, i.length)
    } else {
      destK = 'null'
    }
    destB = Translator.DEST[destK]
    // now parse the jmp, as its easily identifiable
    // by the  ';'
    if (trimmedI.includes(';'))  {
      // jmp is present
      jumpK = trimmedI.substring(trimmedI.indexOf(';') + 1, trimmedI.length)
      trimmedI = trimmedI.substring(0, trimmedI.indexOf(';'))
    } else {
      jumpK = 'null'
    }

    jumpB = Translator.JUMP[jumpK]
    // all that remains is the comp
    compK = trimmedI.trim()
    compB = Translator.COMP[compK]

    binary += compB + destB + jumpB
    return binary 
  }

  constructor () {}
}
module.exports = Translator
