const readline = require("readline");

function enterMarks() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function promptForMarks() {
    rl.question("Enter student marks (0-100) or type 'exit' to quit: ", (input) => {
      if (input.toLowerCase() === "exit") {
        console.log("Exiting the program. Goodbye!");
        rl.close(); // Stop the program when the user types 'exit'
        return;
      }

      let marks = Number(input); // Convert the input to a number

      // Validate the input
      if (isNaN(marks) || marks < 0 || marks > 100) {
        console.log("Invalid input! Please enter a number between 0 and 100.");
      } else {
        // Determine the grade
        let grade;
        if (marks > 79) {
          grade = "A";
        } else if (marks >= 60) {
          grade = "B";
        } else if (marks >= 50) {
          grade = "C";
        } else if (marks >= 40) {
          grade = "D";
        } else {
          grade = "E";
        }

        // Output the grade
        console.log(`The grade for marks ${marks} is: ${grade}`);
      }

      promptForMarks(); // Recursively call to keep prompting
    });
  }

  promptForMarks(); // Initial call to start the loop
}

// Call the function
enterMarks();
