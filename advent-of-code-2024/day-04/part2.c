#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

#define DEBUG 1


int** board;
int rows = 0;
int cols = 0;

int isInsideBoard(int x, int y) {
  return x > 0 && x<(rows-1) && y>0 && y<(cols-1);
}

int checkPosition(int** board, int x, int y) {
  if(board[x][y] != 'A') { return 0; }
  
  printf("[%d,%d] -> Searching from %c...\n", x, y, board[x][y]);  

  if(!isInsideBoard(x, y)) {
    return 0;
  }

  printf("Is inside board\n");

  int first = (board[x-1][y-1] == 'M' && board[x+1][y+1] == 'S') ||  (board[x-1][y-1] == 'S' && board[x+1][y+1] == 'M');
  int second = (board[x-1][y+1] == 'M' && board[x+1][y-1] == 'S') || (board[x-1][y+1] == 'S' && board[x+1][y-1] == 'M');

  if(first && second) {
    printf("X-MAS Found\n");
  }
  return first && second;
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

  printf("Searching for X-MAS...\n");
  
  int total_xmas_count = 0;
 
  for(int i=0; i<rows; i++) {
    for(int j=0; j<cols; j++) {
      total_xmas_count = total_xmas_count + checkPosition(board, i, j);
    }
  }

  printf("The board contains %d X-MAS\n", total_xmas_count);
}
