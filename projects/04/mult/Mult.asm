// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.


// Pseudo-code
// for (let i = 0; i <  R1; i++) {
//   result = result + R0
// }
// Add R0, R1 times.
//
// n = R1
// product = 0
// i = 0
// LOOP:
//   if i > n goto STOP
//   product = procuct + R0
//   i = i + 1
//   goto LOOP
// STOP:
//  R2 = product


// CODE
  @R0 // select 0 register
  D=M // store contents of 0 register in D
  @n  // variable n
  M=D // n = R0 store value of R0 in n variable

  @i  // create and select variable i 
  M=1 // initialize the selcted register (i) as 1

  @product  // store the result in a temporary variable at the next available register
  M=0

(LOOP)
  @i
  D=M // D = i
  @R1
  D=D-M // D = i - R1 , how many times we're adding R0 to itself
  @STOP
  D;JGT // if i > R1 goto STOP

  @n
  D=M // store what to add
  @product
  M=D+M // get the cycle's product result

  @i
  M=M+1 // increment for our loop

  @LOOP
  0;JMP //start the loop again


(STOP)
  @product
  D=M
  @R2
  M=D // RAM[2] = product

(END)
  @END
  0;JMP












