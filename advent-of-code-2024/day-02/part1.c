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

        int is_safe = TRUE;
        int direction = 0;
        int level;

        sscanf(token, "%d", &level);

        while (token != NULL) {
            int prev = level;

            token = strtok(NULL, " ");

            if (token == NULL) {
                break;
            }

            sscanf(token, "%d", &level);

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
            // printf("%d ", level);
        }

        if (is_safe) {
            safe_rows++;
        }
        // printf("%d\n", is_safe);
    }

    printf("Total safe lines: %d", safe_rows);
}
