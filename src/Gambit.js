'use strict';

// A dice rolling bot called Gambit

// Import config.json
const {prefix, token} = require('../dependencies/config.json');

// Import the discord.js module
const{Client, Intents} = require('discord.js');

// Import the DiceRoll module
const{DiceRoll} = require('../dependencies/DiceRoll.js');

// Create an instance of a Discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// Create an instance of the DiceRoll module
//const diceRoll = new DiceRoll(3, 12);

// Ready event is vital, it means that only _after_ this will your bot start reacting to information
// recieved from Discord
client.on('ready', () => {
    console.log('I am ready!');
});

//Create a listener for messages
client.on('message', message => {
    // If the message is "-help" or "-h"
    if(message.content === `${prefix}help` || message.content === `${prefix}h`){
        // Print list of commands
        message.channel.send('```\n-roll xdy replace x with number of dice to roll and y with sides on the dice' +
        '\n```');
    } else {
        let input = message.content;
        let commandArray = input.split('d');

        switch(commandArray[1]){
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 20:
                message.channel.send(new DiceRoll(commandArray[0], commandArray[1]))
                break;
        }
    }
});

// Log the bot in using the token from http://discord.com/developers/applications
client.login(token);