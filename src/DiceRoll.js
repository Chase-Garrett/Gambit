'use strict';

// Module for handling dice rolling
class DiceRoll{
    // Constructor takes in number of dice to roll
    // and the number of sides on the dice
    constructor(numDice, diceSides){
        this.numDice = numDice;
        this.diceSides = diceSides;
    }

    // function to roll dice and return value
    roll(){
        let sum = 0;
        for(let i = 0; i < this.numDice; i++){
            let tempSum = Math.floor(Math.random() * (this.diceSides) + 1);
            sum = sum + tempSum;
        }
        return sum;
    }
}

module.exports.DiceRoll = DiceRoll;