#include <iostream>
#include <vector>

void display_grid(std::vector<char> grid) {
	for (int i = 0; i < grid.size(); i++) {
		if (grid[i] == NULL) {
			grid[i] = ' ';
		}
	}

	std::cout << "\n" << grid[0] << "|" << grid[1] << "|" << grid[2] << "\n";
	std::cout << grid[3] << "|" << grid[4] << "|" << grid[5] << "\n";
	std::cout << grid[6] << "|" << grid[7] << "|" << grid[8] << "\n\n";
}

std::vector<char> change_grid(std::vector<char> grid, int change, std::string player) {
	int grid_change = change - 1;
	if (player == "Player 1") {
		if (grid[grid_change] == NULL) {
			grid[grid_change] = 'X';
		}
		else {
			std::cout << "\nDon't try cheat!\n";
		}
	}
	else {
		if (grid[grid_change] == NULL) {
			grid[grid_change] = 'O';
		}
		else {
			std::cout << "\nDon't try cheat!\n";
		}
	}
	return grid;
}

bool win_condition(std::vector<char> grid) {
	if ((grid[0] == 'X' && grid[1] == 'X' && grid[2] == 'X') || (grid[0] == 'O' && grid[1] == 'O' && grid[2] == 'O')) {
		return true;
	}
	else if ((grid[3] == 'X' && grid[4] == 'X' && grid[5] == 'X') || (grid[3] == 'O' && grid[4] == 'O' && grid[5] == 'O')) {
		return true;
	}
	else if ((grid[6] == 'X' && grid[7] == 'X' && grid[8] == 'X') || (grid[6] == 'O' && grid[7] == 'O' && grid[8] == 'O')) {
		return true;
	}
	else if ((grid[0] == 'X' && grid[3] == 'X' && grid[6] == 'X') || (grid[0] == 'O' && grid[3] == 'O' && grid[6] == 'O')) {
		return true;
	}
	else if ((grid[1] == 'X' && grid[4] == 'X' && grid[7] == 'X') || (grid[1] == 'O' && grid[4] == 'O' && grid[7] == 'O')) {
		return true;
	}
	else if ((grid[2] == 'X' && grid[5] == 'X' && grid[8] == 'X') || (grid[2] == 'O' && grid[5] == 'O' && grid[8] == 'O')) {
		return true;
	}
	else if ((grid[0] == 'X' && grid[4] == 'X' && grid[8] == 'X') || (grid[0] == 'O' && grid[4] == 'O' && grid[8] == 'O')) {
		return true;
	}
	else if ((grid[2] == 'X' && grid[4] == 'X' && grid[6] == 'X') || (grid[2] == 'O' && grid[4] == 'O' && grid[6] == 'O')) {
		return true;
	}
	else {
		return false;
	}
}

bool draw_check(std::vector<char> grid) {
	int count = 0;
	for (int i = 0; i < grid.size(); i++) {
		if (grid[i] == NULL) {
			count += 1;
		}
	}
	if (count == 0) {
		return true;
	}
	else {
		return false;
	}
}