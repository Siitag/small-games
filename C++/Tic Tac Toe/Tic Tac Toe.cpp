#include <iostream>
#include <vector>
#include "ttt_functions.h"

int main() {
	bool game_end = false;
	bool win = false;
	bool draw = false;
	std::vector<char> grid(9);
	int guess = 0;
	int round = 0;
	std::string player = "";

	while (game_end == false) {
		round += 1;
		if (round % 2 == 1) {
			player = "Player 1";
		}
		else {
			player = "Player 2";
		}
		display_grid(grid);
		std::cout << player << " it is your turn:\n";
		std::cin >> guess;
		grid = change_grid(grid, guess, player);
		if (win_condition(grid) == true) {
			win = true;
			game_end = true;
		}
		if (draw_check(grid) == true) {
			draw = true;
			game_end = true;
		}
	}

	display_grid(grid);

	if (win = true) {
		std::cout << player << " You Win!";
	}
	else if (draw = true) {
		std::cout << "Unlucky, Its a draw!";
	}
}

