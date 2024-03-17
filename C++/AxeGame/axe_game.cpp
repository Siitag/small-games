#include "raylib.h"

int main()
{
    //size of window
    int width = 800;
    int height = 450;

    //circle variables
    int circleX = 50;
    int circleY = 50;
    int circleRadius = 25;

    //axe variables
    int axeX = 400;
    int axeY = 0;
    int axeLength = 50;
    int axeVelocity = 5;

    //finish variables
    int goalX = 750;
    int goalLength = 50;

    //game states
    bool gameClose = false;
    bool gameOver = false;
    bool gameWon = false;
    
    InitWindow(width,height,"Axe Game");

    //game fps
    SetTargetFPS(60);

    while (gameClose == false)
    {

        //axe movement
        axeY += axeVelocity;

        //circle hitbox
        int left_circle = circleX - circleRadius;
        int right_circle = circleX + circleRadius;
        int top_circle = circleY - circleRadius;
        int bottom_circle = circleY + circleRadius;

        //axe hitbox
        int left_axe = axeX;
        int right_axe = axeX + axeLength;
        int top_axe = axeY;
        int bottom_axe = axeY + axeLength;

        //collision logic
        bool collision_with_axe = 
                    (bottom_axe >= top_circle) &&
                    (top_axe <= bottom_circle) &&
                    (right_axe >= left_circle) &&
                    (left_axe <= right_circle);

        bool collision_with_end =  (right_circle >= goalX);
        
        if (collision_with_axe)
        {
            gameOver = true;
        }

        if (collision_with_end)
        {
            gameWon = true;
        }


        BeginDrawing();
        ClearBackground(WHITE);
        if (gameOver)
        {
            DrawText("Game Over!", (width/2 - 70), 200, 20, RED);
        }
        else if (gameWon)
        {
            DrawText("Game Won!", (width/2 - 70), 200, 20, GREEN); 
        }
        else
        {
            DrawCircle(circleX,circleY,circleRadius,BLUE);
            DrawRectangle(axeX,axeY,axeLength,axeLength, RED);
            DrawRectangle(goalX,0,goalLength,height,GREEN);

            //circle movement logic
            if (IsKeyDown(KEY_A) && left_circle > 0) {circleX -= 5;}
            if (IsKeyDown(KEY_D) && right_circle < width) {circleX += 5;}
            if (IsKeyDown(KEY_W) && top_circle > 0) {circleY -= 5;}
            if (IsKeyDown(KEY_S) && bottom_circle < height) {circleY += 5;}

            //axe bounce logic
            if (bottom_axe > height || top_axe < 0)
            {
                axeVelocity = -axeVelocity;
            }
        }

        EndDrawing();

        //game close logic
        if (WindowShouldClose())
        {
            gameClose = true;
        }

    }
}