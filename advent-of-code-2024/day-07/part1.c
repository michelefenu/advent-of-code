#include <stdio.h>
#include "sds.h"

int main(void) {
    FILE* fp;
    sds line = sdsempty();
    char ops[255];

    fp = fopen("input.txt", "r");
    if (fp == NULL) {
        printf("Error opening file\n");
        return 1;
    }

    while(fgets(buf, sizeof(buf), fp) != NULL) {
        long test_value;
        sds *operands;
        int count;

        line = sdscpy(line, line2);
        line = sdstrim(line, "\r\n");

        sscanf(line, "%ld:%s", &test_value, &ops);
        operands = sdssplitlen(ops, sdslen(ops), " ", 1, &count); 

        printf("%ld -> %s\n", test_value, operands[0]);

        sdsfree(operands);
    }

    sdsfree(line);
    fclose(fp);
    return 0;
}
  
