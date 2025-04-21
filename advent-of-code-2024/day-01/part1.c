/* 
Don't forget to redirect input file when executing program
 
./part1 < input.txt
 
Let's see what I rember of C language. No special tricks here, just a JavaScript dev trying to figuring out ho to read from stdin and cycle 2 arrays

*/

#include <stdio.h>
#include <stdlib.h>

#define MAX_LIST_SIZE 2000


void sort_array(int *arr, int size) {
  int swapped = 1;
  while(swapped) {
		swapped = 0;
		for(int i=0; i<size - 1; i++) {
			if(arr[i]>arr[i+1]) {
				int temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				swapped = 1;
			}
		}
	}
}

int main(void) {
  int list1[MAX_LIST_SIZE];
  int list2[MAX_LIST_SIZE];
  int lp = 0;
  int distance = 0;

  while(scanf("%d %d", &list1[lp], &list2[lp]) != EOF) {
		lp++;
  }

	sort_array(list1, lp);
	sort_array(list2, lp);

  for(int i=0; i<lp; i++) {
		distance = distance + abs(list1[i] - list2[i]);
	}

	printf("The distance is %d", distance);
}
