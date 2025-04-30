#include <stdio.h>
#include <string.h>
#include <stdlib.h>


typedef struct {
    int x;
    int y;
} Coordinate;

const Coordinate direction_map[] = {
    [0]   = {-1, 0},
    [90]  = {0, 1},
    [180] = {1, 0},
    [270] = {0, -1}
};

int main(void) {
  FILE* fp;
  char buf[255];
  int rows = 0;
  int cols = 0;

  fp = fopen("input.txt", "r");

  while(fgets(buf, sizeof(buf), fp) != NULL) {
    rows++;
  }

  while(buf[cols] != '\n') { cols++; }
  
  rewind(fp);

  char** board = malloc(rows*sizeof(char*));  
  for(int i=0; i<rows; i++) {
    if(fgets(buf, sizeof(buf), fp) != NULL) {
    	board[i] = malloc(cols*sizeof(char));
    	int k = 0;
    	while(buf[k] != '\n') { 
      	board[i][k] = buf[k];
      	k++; 
    	}
		}	
  }

  int guard_x = -1;
  int guard_y = -1;
  for(int i=0; i<rows; i++) {
    for(int j=0; j<cols; j++) {
      printf("%c", board[i][j]);
      if(board[i][j] == '^') {
				guard_x = i;
				guard_y = j;
      }
    }
    printf("\n");
  }

  printf("\n");

  int angle = 0;
  Coordinate direction = direction_map[angle]; // North
  while(guard_x > 0 && guard_x < rows && guard_y > 0 && guard_y < cols) {
    board[guard_x][guard_y] = 'X';
    
    if(guard_x+direction.x < 0 || guard_x+direction.x >= rows || guard_y+direction.y < 0 || guard_y+direction.y >= cols) {
      break;
    }
    if(board[guard_x+direction.x][guard_y+direction.y] != '#') {
      guard_x = guard_x + direction.x;
      guard_y = guard_y + direction.y;
    } else {
      angle = (angle + 90) % 360;
      direction = direction_map[angle];
    }
  } 

  int visited_cells = 0;
  for(int i=0; i<rows; i++) {
    for(int j=0; j<cols; j++) {
      printf("%c", board[i][j]);
      if(board[i][j] == 'X') {
				visited_cells++;
      }
    }
    printf("\n");
  }

	free(board);

  printf("Total visited cells: %d", visited_cells);  
}
