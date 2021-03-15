// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// Pseudo-Code
// infinite loop
// check kecode > 0 
// goto FILL
// else goto EMPTY

// addr = SCREEN (beginning register of Sreen Memory Map)
// n = RAM[0]
// i = 0

// LOOP:
// if i > n goto END
// RAM[addr] = -1 1111111111111111

// advances to next row
// addr = addr + 32
// i = i + 1
// goto LOOP

// Code:

(START)
  // Screen is 512 x 255
  // First 32 "word"s 16bit line, corresponse to first row of display unit

  @8192 // (32 * 256) number of 16 bit lines needed for fill/emptying (End of Screen)
        // (32 16bit sequences for each row, 256 rows)
  D=A
  @addr
  M=D // addr now has the 8192 val, starting any loop with the value
      // of the number of bits needed for processing
  
(KEYPOLL)
  @addr
  M=M-1 // substract 1 from the address to go backwards 
        // if this is less than 0, we've processed every bit and can restart
  D=M

  @START
  D;JLT // if the address is less than 0, reinitailize

  @KBD
  D=M // Read the value stored at KBD

  @EMPTY
  D;JEQ // if keycode is zero, empty the screen

  @FILL
  D;JGT // if D > 0, FILL

(FILL)
  @SCREEN
  D=A // store address of SCREEN register in D
  @addr
	A=D+M   // add current address val onto screen register
  M=-1  // set value of current address 1111111111111111 BLACK

  @KEYPOLL
  0;JMP

(EMPTY)
  @SCREEN
  D=A
  @addr
  A=D+M
  M=0

  @KEYPOLL
  0;JMP
  
  


