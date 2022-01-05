                                                        SNAKE GAME

Snake is a simple game that mimics the movement of a snake.
It depicts a snake that eats food that are left on it part.
The snake dies when its head touches one of the four borders.
The snake length(body part) grows whenever it eats(collides) with food.

                                                        COMPONENTS

1. BodyPart and Snake: The snake consist of four(4) bodyParts. One of the bodyPart is the head.
   Whenever the snake collides(eats) a food, the body parts increases by one.
   Body part with index 0 determines if the snake is colliding with a wall(border)
   or eating a food.

2. Controllers: The game has four controll buttons that determines what direction the snake moves.
   By default the snake moves downward.
   Direction only changes when the clicked direction is adjacent to the present one,
   i.e when the snake is moving downward, a click on the up button will have no effect.
   In such scenerio, the snake can only move to the left or to the right.

3. Food: The food is designed to show at any random location inside the playing field.
   The food shows a few seconds after the last food that appeared has been eaten.

4. PlayingField: The playing field is a four cornered border that serves as the bounding region the snake can
   move in without "dieing".

5. context: Context module contains the logic of the game and it also serves as the Context API for the game.

6. App.test: The logic of the game is tested in this module.
