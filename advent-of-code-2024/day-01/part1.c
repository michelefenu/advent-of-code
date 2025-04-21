#include <stdio.h>

int main(void) {
	char buffer[80];
	while(fgets(buffer, sizeof(buffer), stdin) != NULL) {
		printf("%s", buffer);
	}	
}
