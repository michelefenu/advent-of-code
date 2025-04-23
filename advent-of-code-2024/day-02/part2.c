#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

int main(void) {
    FILE *file;
    char buffer[84];

    file = fopen("input.txt", "r");

    int safe_rows = 0;

    while (fgets(buffer, 84, file) != NULL) {
        char *token;
        token = strtok(buffer, " ");

        int levels[84];
        int lp = 0;

        sscanf(token, "%d", &levels[0]);

        while (token != NULL) {
            lp++;

            token = strtok(NULL, " ");

            if (token == NULL) {
                break;
            }

            sscanf(token, "%d", &levels[lp]);
        }

        int is_first_pass = 1;

        // Try lp times if not safe, by removing a level
        for (int tries = -1; tries < lp; tries++) {
          int is_safe = TRUE;
          int direction = 0;
          int level;
          int level_copy[84];
          int skip = 0;

            // 1. Prepare the working array
            if (is_first_pass) {
                // Copy the whole array
                for (int i = 0; i < lp; i++) {
                    level_copy[i] = levels[i];
                    printf("%d ", level_copy[i]);
                }
                is_first_pass = 0;

            } else {
                // skip current index
                for (int i = 0; i < lp; i++) {
                    if (i == tries) {
                        skip = -1;
                    } else {
                        level_copy[i + skip] = levels[i];
                        printf("%d ", level_copy[i + skip]);
                      }
                    }
            }
        

            for (int i = 1; i < lp+skip; i++) {
              int prev = level_copy[i-1];
                level = level_copy[i];

                if (direction == 0) {
                    if (prev > level) {
                        direction = -1;
                    } else if (prev < level) {
                        direction = 1;
                    } else {
                        is_safe = FALSE;
                        break;
                    }
                }

                if (direction == -1 && (prev < level || abs(prev - level) < 1 || abs(prev - level) > 3)) {
                    is_safe = FALSE;
                    break;
                } else if (direction == 1 && (prev > level || abs(prev - level) < 1 || abs(prev - level) > 3)) {
                    is_safe = FALSE;
                    break;
                }

            }

            printf(": %d\n", is_safe);

            if (is_safe) {
                safe_rows++;
                break;
            } 
        } 
    }

    printf("Total safe lines: %d", safe_rows);
}
