<div align=center>

<img src="https://github.com/melissaveraherbst/find-your-hat/assets/84316275/284bc90d-8a35-45de-b73a-7de42e7f46b2" width=55%/>

# Find Your Hat

</div>

This is a simple text-based game using JavaScript and the terminal. The game involves finding a hat in a randomly generated field, avoiding holes, and navigating through the field using user inputs.

## Game Mechanics

- The game field is randomly generated with a hat, holes, and a starting position.
- The player navigates through the field using "W" (up), "A" (left), "S" (down), and "D" (right) keys.
- The game ends when the player finds the hat, falls into a hole, or quits the game.

## How can the code be improved?

- **Code Structure:** Breaking down some methods into smaller functions would enhance readability and maintainability.
- **Input Handling:** The game currently listens for user input using `process.stdin.on("data", ...)`. A more controlled input approach, such as utilizing the `readline` module could be considered.
- **Game Logic:** Introducing features, levels, or challenges would add depth and variety to the game. A few ideas I have include:
  - Implementing a reset feature to start a new game (at the moment the process simply ends and the script needs to be run again to start another game).
  - Logic to ensure the solvability of the current game field would be valuable.
  - Implementing a game challenge such as finding the hat in a specified amount of moves could be added. This will likely go hand in hand with the logic for testing the solvability of the current game field.
  - Difficulty levels, categorized as Easy, Normal, or Hard, could dynamically adjust the field size and hole quantity based on the chosen difficulty.
- **Scalability:** Currently, the game field size is fixed at 10x10. it could be made more dynamic by allowing users to set the field size before starting a new game or by adjusting it dynamically based on different difficulty levels.

## Demo

<div align=center>

<img src="https://github.com/melissaveraherbst/find-your-hat/assets/84316275/41f6e74a-bb90-49b5-8430-4ccce62860c9" width=65% />
  
</div>


---
Made with 🩷 by Melissa V. Herbst
