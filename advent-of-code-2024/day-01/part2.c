/*
 * Redirect input file to stdin ./part1 < input.txt
 *
 * Let's see what I rember of C language. No special tricks here, just a JavaScript dev trying to figuring out ho to read from stdin and cycle 2 arrays. 
 */

#include <stdio.h>

#define MAX_LIST_SIZE 2000

int count_occurrences(int target, int *arr, int size) {
  int occurrences = 0;
  for(int i=0; i<size; i++) {
    if(arr[i] == target) {
      occurrences++;
    }
  }
  
  return occurrences;
}

int main(void) {
  int list1[MAX_LIST_SIZE];
  int list2[MAX_LIST_SIZE];
  int lp = 0;
  int similarity = 0;

  while (scanf("%d %d", &list1[lp], &list2[lp]) != EOF) {
    lp++;
  }


  for (int i = 0; i < lp; i++) {
    similarity = similarity + list1[i] * count_occurrences(list1[i], list2, lp);
  }

  printf("The similarity is %d", similarity);
}
