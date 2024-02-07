<div align=center>

<img src="https://github.com/melissaveraherbst/find-your-hat/assets/84316275/50338494-d257-439a-8911-32616e36f07f" width=125 />

# Find Your Hat

</div>

This is a simple text-based game. The game involves finding a hat in a randomly generated field, avoiding holes, and navigating through the field using user inputs.

**Game Mechanics:**

- The game field is randomly generated with a hat, holes, and a starting position.
- The player navigates through the field using "w" (up), "a" (left), "s" (down), and "d" (right) keys.
- The game ends when the player finds the hat, falls into a hole, or quits the game.

**How can the code be improved?**

- **Code Structure:** The code is well-organized with a class (`Field`) and methods. However, breaking down some methods into smaller functions would enhance readability and maintainability.
- **Input Handling:** The game currently listens for user input using `process.stdin.on("data", ...)`. Consider a more controlled input approach, such as utilizing the `readline` module.
- **Game Logic:** Introducing features, levels, or challenges would add depth and variety to the game. A few ideas include:
  - Implementing a reset feature to start a new game and logic to ensure the solvability of the current game field would be valuable.
  - Levels, categorized as Easy, Normal, or Hard, could dynamically adjust the field size and hole quantity based on the chosen difficulty.
  - a Challenge such as finding the hat in a specified amount of moves can be added. This may go hand in hand with the logic for testing the solvability of the current game field.
- **User Interface:** Elevate the user interface by incorporating more descriptive messages, clearing the console for a cleaner display, and providing a legend explaining the symbols used in the game.
- **Scalability:** Currently, the game field size is fixed at 10x10. Consider making it more dynamic by allowing users to set the field size when starting a new game or adjusting it dynamically based on different difficulty levels.
