CC= gcc
CFLAGS= -Wall -Wextra -Werror
DFLAGS= 
APP= main.c 
SRCS := $(wildcard *.cpp)
SRCS := $(filter-out $(APP), $(SRCS))
EXE= test

#fonts
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m

#misc
.PHONY: all clean test valgrind




#targets

test: $(SRCS) $(APP)
	clear
	@$(CC) $(CFLAGS) $(DFLAGS) $(APP) $(SRCS)  -o $(EXE)
	@echo "Running test..."
	@./$(EXE)

valgrind: $(SRCS) $(APP)
	clear
	@$(MAKE) testD > /dev/null 2>&1
	@sleep .5
	@echo "Running valgrind..."
	@valgrind --log-file=valgrind_log.txt --leak-check=full --show-leak-kinds=all --track-origins=yes ./$(EXE) > /dev/null 2

	@grep "All heap blocks were freed -- no leaks are possible"	 valgrind_log.txt 
	@grep "ERROR SUMMARY: 0 errors from 0 contexts" valgrind_log.txt
	@echo "Valgrind results:$(GREEN) PASSED $(NC) Off to the fishes!"


profile:
	$(CC) -pg -g $(APP) $(SRC) -o $(EXE)
	./$(EXE)
	gprof $(EXE) gmon.out > analysis.txt


clean:
	clear
	@rm -f $(EXE)
	@rm -f *.o
	@rm -f *.out
	@rm -f valgrind_log.txt
	@rm -f analysis.txt
	@echo "Cleaned up"

submit:
	368submit <HW0#> $(APP)
