/*
 * State parser
 * 
 * 0: clear 1st and 2nd operand, if read m -> 1 else 0
 * 1: if read u -> 2 else 0
 * 2: if read l -> 3 else 0
 * 3: if read ( -> 4 else 0
 * 4: if read [0-9] -> save to 1st operand and 4, if read comma -> 5 else 0
 * 5: if read [0-9] -> save to 2nd operand and 5, if read ) -> 6 else 0
 * 6: multiply 1st and 2nd operand, add to total and 0. If m is read state = 1;
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <ctype.h>

#define MAX_INPUT_SIZE 2000

// Return the order of magnitude of 
int get_magnitude(int operand) {
  return floor(log10(operand) + 1);
}

int main(void) {
  int result = 0;
  int o1;
  int o2;

  char input[MAX_INPUT_SIZE];
  int len = 0;

  int state = 0;

  // %n number of characters consumed
  while(scanf("%s%n", input, &len) != EOF) {
    for(int i=0; i<len; i++) {
      switch(state) {
	case 0:
	  o1 = 0;
          o2 = 0;
	  if(input[i] == 'm') { state = 1; }
	  break;
	case 1:
	  if(input[i] == 'u') { state = 2; }
	  else { state = 0; }
	  break; 
	case 2:
	  if(input[i] == 'l') { state = 3; }
	  else { state = 0; }
	  break; 
        case 3:
	  if(input[i] == '(') { state = 4; }
	  else { state = 0; }
	  break;
	case 4:
	  // read comma
	  if(input[i] == ',') { state = 5; }
	  // read digit
	  else if(isdigit(input[i])) { 
	    // if o1 != 0 shifts the previous digits  
	    int digit = input[i] - '0';
	    if(o1 != 0) {
	      // - "0" to convert to int, subtracting ascii codes
	      o1 = o1 * 10 + digit;
	    } else {
	      o1 = digit;
	    }
	  } else { state = 0; }
	  break;
	case 5:
	  // read right par
	  if(input[i] == ')') { state = 6; }
	  // read digit
	  else if(isdigit(input[i])) { 
	    int digit = input[i] - '0';
	    if(o2 != 0) { 
	      o2 = o2 * 10  + digit;
	    } else {
	      o2 = digit;
	    }
	  } else { state = 0; }
	  break;
	case 6:
	  result = result + o1 * o2;
	  if(input[i] == 'm') {
	    o1 = 0;
	    o2 = 0;
	    state = 1;
	  } else {
	    state = 0;
	  }
	  break;
	}      
      printf("Char: %c      State%d\n", input[i], state);
      }
    }
  printf("The result is %d", result);
}

