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

void printBoard(char** board_to_print, int rows, int cols) {
	for(int i=0; i<rows; i++) {
		for(int j=0; j<cols; j++) {
			printf("%c", board_to_print[i][j]);
		}
		printf("\n");
	}
	fflush(stdout);
}

char** addObstacle(char** board, int rows, int cols, int x, int y) {
	if(board[x][y] == '#' || board[x][y] == '^') {
		return NULL;
	}
	// Let's make a copy of the board
	char** new_board = malloc(sizeof(rows * sizeof(char*)));
	for(int i=0; i<rows; i++) {
		new_board[i] = malloc(cols * sizeof(char));
		for(int j=0; j<cols; j++) {
			new_board[i][j] = board[i][j];
			if(i == x && j == y) {
				new_board[x][y] = 'O';
			}
		}
	}
	
	return new_board;
}

char getDirection(int angle) {
	switch(angle) {
		case 0:
			return 'N';
		case 90:
			return 'E';
		case 180:
			return 'S';
		case 270:
			return 'W';
	}
} 

int isLoop(char** board, int rows, int cols, int guard_x, int guard_y) {
	int angle = 0;
  Coordinate direction = direction_map[angle]; // North
  while(guard_x > 0 && guard_x < rows && guard_y > 0 && guard_y < cols) {
		if(board[guard_x][guard_y] == '.') {
			board[guard_x][guard_y] = getDirection(angle);
		} else {
			if(getDirection(angle) == board[guard_x][guard_y]) {
				board[guard_x][guard_y] = 'L';
				return 1; // Loop detected
			}
		}
    
    if(guard_x+direction.x < 0 || guard_x+direction.x >= rows || guard_y+direction.y < 0 || guard_y+direction.y >= cols) {
      break;
    }
    if(board[guard_x+direction.x][guard_y+direction.y] != '#' && board[guard_x+direction.x][guard_y+direction.y] != 'O') {
      guard_x = guard_x + direction.x;
      guard_y = guard_y + direction.y;
    } else {
      angle = (angle + 90) % 360;
      direction = direction_map[angle];
    }
  }

	return 0; // No loop
}


int main(void) {
  FILE* fp;
  char buf[255];
  int rows = 0;
  int cols = 0;

  fp = fopen("input.txt", "r");

  printf("Bosfsfsdfsdfsdfsard created...\n");
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

  printf("Board created...\n");
  
	int guard_x = -1;
  int guard_y = -1;
  for(int i=0; i<rows; i++) {
    for(int j=0; j<cols; j++) {
      if(board[i][j] == '^') {
				guard_x = i;
				guard_y = j;
      }
    }
  }

  printf("Guard placed at initial position...\n");

	int loops = 0;
	for(int i=0; i<rows; i++) {
		for(int j=0; j<cols; j++) {
			printf("\nTesting Map (%d,%d)\n", i, j);

			char** new_board = addObstacle(board, rows, cols, i, j);
			if(new_board != NULL) {
				if(isLoop(new_board, rows, cols, guard_x, guard_y)) {
					loops++;
					printf("LOOP Detected in (%d, %d)\n", i, j);
				}
				printBoard(new_board, rows, cols);
				free(new_board);
			}
		}
	}

	printf("Total loops detected: %d", loops);

}
