#include <iostream>

int main() {
    int joinchoice;
    int investchoice;
    int mudrykchoice;
    int finalchoice;
    std::string name;

    std::cout << "Welcome To Chelsea Mysteries!\n\n";
    std::cout << "What is your name?: \n";
    std::cin >> name;
    std::cout << "There has been a murder in Chelsea FC Facilities, FIFA has given us a condition: we need to find out who did it so we can verse Arsenal in the Champions League Final (women's team, you really think Arsenal men would reach the finals lmao)\n";
    std::cout << "Would you like to help us?: \n";
    std::cout << "1) Yes\n";
    std::cout << "2) No\n";
    std::cin >> joinchoice;

    while (joinchoice != 1 && joinchoice != 2) {
        std::cout << "You have to input 1 or 2:\n";
        std::cin >> joinchoice;
    }

    if (joinchoice == 1) {
        std::cout << "Correct Choice because it was definitely an option\n";
        std::cout << "There are 3 current suspects, here are the briefings:\n";
        std::cout << "1) Nicolas Jackson, he is a shooter but not a precise one, the murder scene had over 50 bullets but only one hit, it was either from afar or him\n";
        std::cout << "2) Reece James, so injury-prone he gives others injuries. Did not do it intentionally but might try to hide it\n";
        std::cout << "3) Mykhailo Mudryk, famous Jailcat who spends all his time on the wing, literally only a suspect due to gangsta appearance\n";
        std::cout << "Who would you like to Investigate (Only can choose one):\n";
        std::cin >> investchoice;

        while (investchoice != 1 && investchoice != 2 && investchoice != 3) {
            std::cout << "1, 2, or 3 Please, Thank you: \n";
            std::cin >> investchoice;
        }

        if (investchoice == 1) {
            std::cout << "Jackson's playing r6, his aim is so bad he somehow shoots outside his monitor and it hits you, Game Over...\n";
            return 0;
        }
        else if (investchoice == 2) {
            std::cout << "Reece James: I heard some rumors that the pitch is Wett, whatever that means\n";
            std::cout << "Reece James: Also, this might help, but he is a magician with a rabbit\n";
        }
        else if (investchoice == 3) {
            std::cout << "You can either enter:\n";
            std::cout << "1) Mudryk's Room\n";
            std::cout << "2) The room next door whispering 'How could we do that without getting caught'\n";
            std::cin >> mudrykchoice;

            while (mudrykchoice != 1 && mudrykchoice != 2) {
                std::cout << "Just choose correctly thanks, 1 or 2: \n";
                std::cin >> mudrykchoice;
            }

            if (mudrykchoice == 1) {
                std::cout << "Mudryk: I wont snitch, its Nicolas Jackson.\n";
            }
            else {
                std::cout << "You walk in and find contractors, They couldnt let you hear that so they slapped a 7 year jail contract on you. Game Over...\n";
                return 0;
            }
        }

        std::cout << "Its time for you to decide, who do you think it is?: \n";
        std::cout << "1) Nicolas Jackson\n";
        std::cout << "2) Reece James\n";
        std::cout << "3) Mykhailo Mudryk\n";
        std::cin >> finalchoice;

        if (finalchoice == 1) {
            std::cout << "FIFA Allow Chelsea to play and they beat Arsenal 52-0 in the UCL final with all the goals coming from Osimhen\n";
            std::cout << "You saved chelsea, good job. Till another time...\n";
        }
        else {
            std::cout << "You are the reason chelsea couldn't play, all the fans sending you so much hate you couldn't handle it so you went out and a middlesborough fan stabbed you once to make it 1-0... Game Over\n";
        }

    }
    else {
        std::cout << "You left the premises, Nicolas Jackson meant to shoot the ball inside the goal but hit you in the head, and you suffered brain damage... Game Over!\n";
    }

    return 0;
}