#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

#define DEBUG 1

typedef struct {
  int x;
  int y;
} Shift;

typedef struct {
  char* name;
  Shift shift;
} Direction;

int** board;
int rows = 0;
int cols = 0;

int isInsideBoard(int x, int y) {
  return x >= 0 && x<rows && y>=0 && y<cols;
}

int checkPosition(int** board, int x, int y) {
  // how many XMAS we can read from current position in the grid
  char* search_string = "XMAS";
  int xmas_count = 0;

  Direction directions[] = {
    { "N",  {-1,  0} },
    { "NE", {-1,  1} },    
    { "E",  {0,  1} },
    { "SE", {1, 1} },
    { "S",  {1, 0} },
    { "SW", {1,-1} },
    { "W",  {0, -1} },
    { "NW", {-1, -1} },
  };

  int search_str_len = strlen(search_string);
  // 8 is the number of directions, not the best method, anyway...
  for(int k=0; k<8; k++) {
    int state = 1;
    int i = x;
    int j = y;
    
    if(board[i][j] != search_string[0]) { 
      printf("%d,%d -> %c ", i, j, board[i][j]);
      printf("not equal to first char %c\n", search_string[0]);  
      break; 
    } else {
      printf("Searching from [%d, %d]\n", i, j);
    }

    for(int l=1; l<search_str_len; l++) {
      Direction dir = directions[k];
      
      i = i + dir.shift.x;
      j = j + dir.shift.y;
      
      if(isInsideBoard(i,j) && board[i][j] == search_string[l]) {
	printf("[%d,%d] %d,%d -> %c SUCCESS (state %d, dir %s)\n", x, y, i, j, board[i][j], state, dir.name);
	state++;
      } else {
	break;
      }  
    }
    if(state == search_str_len) { xmas_count++; }
  }  
  printf("Total from position: %d,%d -> %d\n", x, y, xmas_count); 
  return xmas_count;    
}

int main(void) {
  FILE* fp;
  fp = fopen("input.txt", "r");

  char buf[255];
  
  // Count rows and cols, rewind file pointer, and allocate board rows
  while(fgets(buf, sizeof(buf), fp) != NULL) {
    rows++;
    if(cols == 0) {
      while(buf[cols] != '\n') { cols++; };
    }
  }
  rewind(fp);

  board = malloc(rows*sizeof(int *));

  printf("\nBoard size: %dx%d\n\n", rows, cols);  

  // Read lines, split into cols, allocate cols and write values
  int lp = 0;
  while(fgets(buf, sizeof(buf), fp) != NULL) {
    board[lp] = malloc(cols*sizeof(char *));

    for(int i=0; i<cols; i++) {
      board[lp][i] = buf[i];
    }

    lp++;
  }
  // Print board to screen just to check everything is ok
  if(DEBUG) {
    for(int i=0; i<rows; i++) {
      for(int j=0; j<cols; j++) {
	printf("%c", board[i][j]);
      }
      printf("\n");
    }
  }

  printf("Searching for XMAS...\n");
  
  int total_xmas_count = 0;
 
  for(int i=0; i<rows; i++) {
    for(int j=0; j<cols; j++) {
      total_xmas_count = total_xmas_count + checkPosition(board, i, j);
    }
  }

  printf("The board contains %d XMAS\n", total_xmas_count);
}
