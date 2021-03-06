'use strict';

// A dice rolling bot called Gambit

// Import config.json
const {prefix, token} = require('./config.json');

// Import the discord.js module
const{Client, Intents} = require('discord.js');

// Import the DiceRoll module
const{DiceRoll} = require('./DiceRoll.js');

// Create an instance of a Discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// Create an instance of the DiceRoll module
//const diceRoll = new DiceRoll(3, 12);

// Ready event is vital, it means that only _after_ this will your bot start reacting to information
// recieved from Discord
client.on('ready', () => {
    console.log('Gambit is connected and ready.');
});

function doHelp(message){
    message.channel.send('```\n-roll xdy replace x with number of dice to roll and y with sides on the dice' +
    '\n-coin and -cointoss both prompt Gambit to flip a coin and return either "Heads!" or "Tails!"' +
    '\n```');
}

function doCoinToss(command, message){
    console.log(command);
    if((command[0] == "coin" || command[0] == "cointoss") && command[1] == null){
        let dice = new DiceRoll(1, 2);

        if(dice.roll() == 2){
            message.channel.send("Heads!");
        } else{
            message.channel.send("Tails!");
        }
    } else{
        message.channel.send("ERROR: invalid arguments");
    }
}

function doRoll(args, message){
    let command;

    try {
        command = args[1].split("d");
    } catch (err) {
        message.channel.send("ERROR: invalid arguments");
        return;
    }

    let numDice;
    let numSides;

    if (command[0] != "") {
        numDice = command[0];
        numSides = command[1];
    } else if (command[0] == "") {
        numDice = 1;
        numSides = command[1];
    } else {
        message.channel.send("ERROR: invalid arguments");
        return;
    }

    // If statement that locks in the number of rolls for a given command
    if(parseInt(numDice) <= 100){
        let dice = new DiceRoll(parseInt(numDice), parseInt(numSides));

        // switch statement to determine allowable dice
        switch(parseInt(numSides)){
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 20:
                message.channel.send(dice.roll())
                break;
            default:
                message.channel.send("ERROR: invalid dice type");
                return;
        }
    } else{
        message.channel.send('You are trying to roll to many dice!');
    }
}

//Create a listener for messages
client.on('message', message => {
    if(message.content[0] == prefix){
        let command = message.content.slice(1).trim().split(/ +/);

        // Switch statement to check input against available commands
        // prevents unnecessary conditional checking in cmd functions
        switch(command[0]){
            case "help":
            case "h":
                doHelp(message);
                break;
            case "coin":
            case "cointoss":
                doCoinToss(command.slice(0), message);
                break;
            case "roll":
                doRoll(command.slice(0), message);
                break;
            default:
                message.channel.send(`ERROR: command ${command[0]} not supported.`);
        }
    }
});

// Log the bot in using the token from http://discord.com/developers/applications
client.login(token);