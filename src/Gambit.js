'use strict';

// A dice rolling bot called Gambit
// Import the discord.js module
const{Client, Intents} = require('discord.js');

// Import the DiceRoll module
const{DiceRoll} = require('../dependencies/DiceRoll.js');

// Create an instance of a Discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// Create an instance of the DiceRoll module
const diceRoll = new DiceRoll(2, 6);

// Ready event is vital, it means that only _after_ this will your bot start reacting to information
// recieved from Discord
client.on('ready', () => {
    console.log('I am ready!');
});

//Create a listener for messages
client.on('message', message => {
    // If the message is "ping"
    if(message.content === 'ping'){
        // Send 'pong' to the same channel
        message.channel.send('pong');
    }

    if(message.content === '-roll test'){
        message.channel.send(diceRoll.roll());
    }
});

// Log the bot in using the token from http://discord.com/developers/applications
client.login('');