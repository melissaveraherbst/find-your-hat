// TODO:
// ADD AN OPTION TO START A NEW GAME WITH A NEW FIELD WHEN THE GAME IS OVER
// ALLOW THE USER TO RESET THE GAME WHENEVER
// ADD A HELPER FUNCTION THAT PRINTS THE INSTRUCTIONS AFTER EVERY PRINT FIELD

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
  static generateField(width, height) {
    // helper function to generate a row of characters for the width of the field
    function generateFieldWidth() {
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
    }

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
  }
  // --------------------------------------------------
  startGame() {
    process.stdout.write("\n" + "Can you find your hat?" + "\n\n");
    this.printField(this.field);
    process.stdout.write(
      "\n" + "Choose a direction from the following: w = 'up', a = 'left', s = 'down', d = 'right'" + "\n" + "(q = 'quit game')" + "\n"
    );
    this.getUserData();
  }
  // --------------------------------------------------
  getUserData() {
    process.stdin.on("data", (userInput) => {
      let input = userInput.toString().trim().toLowerCase();
      this.actionUserInput(input, this.field);
    });
  }
  // --------------------------------------------------
  actionUserInput(userInput) {
    // Validate user input
    let validInputs = {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
      q: "quit game",
    };
    if (!validInputs[userInput]) {
      process.stdout.write("\n" + "Invalid input recieved." + "\n" + "Choose a direction from the following: w = 'up', a = 'left', s = 'down', d = 'right'" + "\n" + "(q = 'quit game')" + "\n"
      );
    }

    // quit game
    if (userInput === "q") {
      console.log("OK! See you later!");
      process.exit();
    }

    // helper function to test the player's current position and update the field accordingly
    function testUserInput(y, x, fieldArray) {
      let currentEl = fieldArray[y][x];
      if (currentEl === characters["hat"]) {
        process.stdout.write("\n" + "Congratulations! You found your hat!" + "\n");
        process.stdout.write("\n" + "Play again? 1. Yes / 2. No" + "\n");
      } else if (currentEl === characters["hole"]) {
        process.stdout.write("\n" + "Oh nooooo! You fell into a hole! Game Over." + "\n");
        process.exit();
      } else {
        fieldArray[y][x] = characters["pathCharacter"];
        for (let i = 0; i < fieldArray.length; i++) {
          console.log(fieldArray[i].join(" "));
        }
      }
    }

    // the following code updates the field according to the user's input
    // before we move the player, we must first check that the player is moving within the field range
    // move player to the left
    if (userInput === "a") {
      if (this.charXPosition <= 0) {
        process.stdout.write(
          "Oops! Can't move out of bounds! Try a different direction.\n"
        );
      } else {
        this.charXPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player to the right
    if (userInput === "d") {
      if (this.charXPosition >= this.field[this.charYPosition].length - 1) {
        process.stdout.write(
          "Oops! Can't move out of bounds! Try a different direction.\n"
        );
      } else {
        this.charXPosition += 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player up
    if (userInput === "w") {
      if (this.charYPosition <= 0) {
        process.stdout.write(
          "Oops! Can't move out of bounds! Try a different direction.\n"
        );
      } else {
        this.charYPosition -= 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }

    // move player down
    if (userInput === "s") {
      if (this.charYPosition >= this.field.length - 1) {
        process.stdout.write(
          "Oops! Can't move out of bounds! Try a different direction.\n"
        );
      } else {
        this.charYPosition += 1;
        testUserInput(this.charYPosition, this.charXPosition, this.field);
      }
    }
  }
  // --------------------------------------------------
  printField(fieldArray) {
    for (let i = 0; i < fieldArray.length; i++) {
      console.log(fieldArray[i].join(" "));
    }
  }
} // END OF CLASS

let fieldArray = Field.generateField(10, 10);

const myField = new Field(fieldArray);

myField.startGame(); 9;
