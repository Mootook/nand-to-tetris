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
   *
   */
  cInstructToBinary (i) {
    console.log('C Instruction: ', i)
    return 'C-INSTRUCTION'
  }

  constructor () {}
}
module.exports = Translator
