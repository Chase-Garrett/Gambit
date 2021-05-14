'use strict';

// Module for handling dice rolling
class DiceRoll{
    // Constructor takes in number of dice to roll
    // and the number of sides on the dice
    constructor(numDice, diceSides){
        this.numDice = numDice;
        this.diceSides = diceSides;
    }

    roll(){
        return (this.numDice * Math.floor(Math.random() * (this.diceSides) + 1));
    }
}

module.exports.DiceRoll = DiceRoll;