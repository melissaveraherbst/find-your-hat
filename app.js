// The characters object defines the characters used in the game, such as the hat, hole, field character, and path character. These characters are styled using ANSI escape codes to add color.
let characters = {
  player: "\u001b[33m" + "$" + "\u001b[0m",
  hat: "\u001b[36m" + "^" + "\u001b[0m",
  hole: "O",
  fieldCharacter: "░",
  path: "\u001b[35m" + "*" + "\u001b[0m",
};

let messages = {
  gameOverMessage: `\n\u001b[31mOh nooooo! You fell into a hole! Game Over.\u001b[0m\n`,
  foundHatMessage: `\n\u001b[36mCongratulations! You found your hat! \u001b[0m \n`,
  instructionsMessage: `\nChoose a direction from the following: w = 'up', a = 'left', s = 'down', d = 'right' \n (q = 'quit game')\n\n`,
  invalidInputMessage: `\nInvalid input received.\n`,
  legendMessage: `\n${characters["player"]} = player | ${characters["hat"]} = hat | ${characters["hole"]} = hole\n`,
  outOfBoundsMessage: `\nOops! Can't move outside the field! Try a different direction\n\n`
};

class Field {
  constructor() {
    this.field = [];
    this.charXPosition = 0;
    this.charYPosition = 0;
  }
  // --------------------------------------------------
  // The generateField method creates a random game field with a specified width and height. It includes a hat, holes, and a starting position.
  generateField = (width, height) => {
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
    fieldArray[startY][startX] = characters["player"];

    return fieldArray;
  };
  // --------------------------------------------------
  // The startGame method initiates the game by generating and printing the playing field, and prompting the user to choose a direction.
  startGame = () => {
    this.field = this.generateField(10, 10);

    process.stdout.write(`\nCan you find your hat?\n\n`);
    this.printField(this.field);
    process.stdout.write(messages.legendMessage);
    process.stdout.write(messages.instructionsMessage);

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
  // The actionUserInput method processes the user's input, updating the current game field and/or game status.
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
      this.printField(this.field);
      process.stdout.write(messages["invalidInputMessage"]);
      process.stdout.write(messages["instructionsMessage"]);
      return;
    }

    // helper function to test the player's current position and update the field accordingly
    let testUserInput = (y, x, fieldArray) => {
      let newElement = fieldArray[y][x];

      if (newElement === characters["hat"]) {
        process.stdout.write(messages["foundHatMessage"]);
        process.exit();
      } else if (newElement === characters["hole"]) {
        process.stdout.write(messages["gameOverMessage"]);
        process.exit();
      } else {
        fieldArray[y][x] = characters["player"];
        this.printField(fieldArray);
        process.stdout.write(messages["legendMessage"]);
        process.stdout.write(messages["instructionsMessage"]);
      }
    };

    // the following code updates the game field according to the user's input
    // note: before we move the player, we first check that the player is moving within the field range

    // record the current player before updating it to the new position. This is so that the current player poistion can be marked with a "path character" and the new player position will be marked with a "player character"
    this.field[this.charYPosition][this.charXPosition] = characters["path"];

    // move player position to the left
    if (userInput === "a") {
      if (this.charXPosition <= 0) {
        process.stdout.write(messages["outOfBoundsMessage"]);
      } else {
        this.charXPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position to the right
    if (userInput === "d") {
      if (this.charXPosition >= this.field[this.charYPosition].length - 1) {
        process.stdout.write(messages["outOfBoundsMessage"]);
      } else {
        this.charXPosition += 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position up
    if (userInput === "w") {
      if (this.charYPosition <= 0) {
        process.stdout.write(messages["outOfBoundsMessage"]);
      } else {
        this.charYPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player position down
    if (userInput === "s") {
      if (this.charYPosition >= this.field.length - 1) {
        process.stdout.write(messages["outOfBoundsMessage"]);
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
    console.clear();
    for (let i = 0; i < fieldArray.length; i++) {
      process.stdout.write(fieldArray[i].join(" ") + "\n");
    }
  };
}

// --------------------------------------------------
// create an instance of the Field class and initiate the game with the startGame method
new Field().startGame();