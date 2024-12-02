const readline = require('readline'); //
const rl = readline.createInterface({
     input:process.stdin, //input from user
    output:process.stdout //output to user
});


const speedLimit = 70; //define the speed limit
function carSpeed(theSpeed){ 
    speed=parseFloat(theSpeed);
    // Validate the input
    if (isNaN(speed) || speed < 0) {
        console.log("Invalid speed. Please enter a valid number.");
      }
    else if (speed <= speedLimit){
        console.log("OK"); //if the speed is within the speed limit . print 'ok'
    } else  {
        let difference;
        let demerit; //stores the demerit points
        difference = speed-speedLimit; //difference of speed and speed limit
        demerit = Math.round(difference/5); //rounds off the demerit point to a whole number point
        console.log(`Demerit points: ${demerit}`);
        //If the demerits are greater than 12, suspend the license
        if (demerit > 12){
            console.log("License suspended");
        }
    }
}

rl.question("Enter speed: ", (input) =>{ //convert the input to a number
    carSpeed(input);
    rl.close(); //closing input prompt
})
