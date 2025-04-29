#include <stdio.h>

int main(void) {

  FILE* fp;
  fp = fopen("input.txt", "r");

  char buf[255];

  // Pages are in 10-99 range
  int rules[100];

  while(fgets(buf, sizeof(buf), fp) != NULL) {
    char indexstr[2];
    char pagestr[2];
    printf("%c%c|||", buf[0], buf[1]);
    indexstr[0] = buf[0];
    indexstr[1] = buf[1];

    pagestr[0] = buf[3];
    pagestr[1] = buf[4];

    int index, page;

    sscanf(indexstr, "%d", &index);
    sscanf(pagestr, "%d", &page);

    printf("Token %s: (%s,%s)\n", buf, indexstr, pagestr);  
  }
}
