// The characters object defines the characters used in the game, such as the hat, hole, field character, and path character. These characters are styled using ANSI escape codes to add color.
let characters = {
  hat: "\u001b[36m" + "^" + "\u001b[0m",
  hole: "O",
  fieldCharacter: "░",
  pathCharacter: "\u001b[35m" + "*" + "\u001b[0m",
};

class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
    this.charXPosition = 0;
    this.charYPosition = 0;
  }
  // --------------------------------------------------
  // The generateField method creates a random game field with a specified width and height. It includes a hat, holes, and a starting position.
  static generateField = (width, height) => {
    // helper function to generate a row of characters for the width of the field
    let generateFieldWidth = () => {
      let array = [];
      let i = 0;
      for (i; i < width; i++) {
        array.push(characters["fieldCharacter"]);
      }

      // add an X amount of holes at a random index in each row
      let holesAmount = 2;
      for (let i = 0; i < holesAmount; i++) {
        let randomIndex = Math.floor(Math.random() * width);
        array[randomIndex] = characters["hole"];
      }
      return array;
    };

    // generate a "height" amount of rows using the generateFieldWidth() helper function
    let fieldArray = [];
    let i = 0;
    for (i; i < height; i++) {
      fieldArray.push(generateFieldWidth(width));
    }

    // add the hat at a random index
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    fieldArray[hatY][hatX] = characters["hat"];

    // add the start (top left corner)
    let startX = 0;
    let startY = 0;
    fieldArray[startY][startX] = characters["pathCharacter"];

    return fieldArray;
  };
  // --------------------------------------------------
  // The startGame method initiates the game by printing the initial field and prompting the user to choose a direction.
  startGame = () => {
    process.stdout.write("\n" + "Can you find your hat?" + "\n\n");
    this.printField(this.field);
    process.stdout.write(
      "\n" + "Choose a direction from the following: w = 'up', a = 'left', s = 'down', d = 'right'" + "\n" + "(q = 'quit game')" + "\n"
    );
    this.getUserData();
  };
  // --------------------------------------------------
  // The getUserData method listens for user input using the process.stdin.on event handler.
  getUserData = () => {
    process.stdin.on("data", (userInput) => {
      let input = userInput.toString().trim().toLowerCase();
      this.actionUserInput(input, this.field);
    });
  };
  // --------------------------------------------------
  // The actionUserInput method processes the user's input, updating the current game field or game status.
  actionUserInput = (userInput) => {
    // Validate user input
    let validInputs = {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
      q: "quit",
    };

    if (!validInputs[userInput]) {
      process.stdout.write("\n" + "Invalid input recieved." + "\n" + "Choose a direction from the following: w = 'up', a = 'left', s = 'down', d = 'right'" + "\n" + "(q = 'quit game')" + "\n"
      );
      return;
    }

    // helper function to test the player's current position and update the field accordingly
    let testUserInput = (y, x, fieldArray) => {
      let currentEl = fieldArray[y][x];

      if (currentEl === characters["hat"]) {
        process.stdout.write("\n" + "\u001b[36m" + "Congratulations! You found your hat!" + "\u001b[0m" + "\n");
        process.exit();
      } else if (currentEl === characters["hole"]) {
        process.stdout.write("\n" + "\u001b[31m" + "Oh nooooo! You fell into a hole! Game Over." + "\u001b[0m" + "\n");
        process.exit();
      } else {
        fieldArray[y][x] = characters["pathCharacter"];
        this.printField(fieldArray);
      }
    };

    // the following code updates the game field according to the user's input
    // note: before we move the player, we first check that the player is moving within the field range
    // move player position to the left
    if (userInput === "a") {
      if (this.charXPosition <= 0) {
        process.stdout.write(
          "\n" + "Oops! Can't move out of bounds! Try a different direction" + "\n"
        );
      } else {
        this.charXPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position to the right
    if (userInput === "d") {
      if (this.charXPosition >= this.field[this.charYPosition].length - 1) {
        process.stdout.write(
          "\n" + "Oops! Can't move out of bounds! Try a different direction" + "\n"
        );
      } else {
        this.charXPosition += 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position up
    if (userInput === "w") {
      if (this.charYPosition <= 0) {
        process.stdout.write(
          "\n" + "Oops! Can't move out of bounds! Try a different direction" + "\n"
        );
      } else {
        this.charYPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position down
    if (userInput === "s") {
      if (this.charYPosition >= this.field.length - 1) {
        process.stdout.write(
          "\n" + "Oops! Can't move out of bounds! Try a different direction" + "\n"
        );
      } else {
        this.charYPosition += 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // quit game
    if (userInput === "q") {
      console.log("\n" + "OK! See you later!");
      process.exit();
    }
  };

  // --------------------------------------------------
  printField = (fieldArray) => {
    for (let i = 0; i < fieldArray.length; i++) {
      console.log(fieldArray[i].join(" "));
    }
  };
}

let myFieldArray = Field.generateField(10, 10);

let myField = new Field(myFieldArray);

myField.startGame();
