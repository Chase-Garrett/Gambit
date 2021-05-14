'use strict';

const { Client } = require('discord.js');

// A dice rolling bot called Gambit

// Import the discord.js module
const(Client, Intents) = require('discord.js');

// Create an instance of a Discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// Ready event is vital, it means that only _after_ this will your bot start reacting to information
// recieved from Discord
client.on('ready', () => {
    console.log('I am ready!');
});

//Create a listener for messages
client.on('message', message => {
    // If the message is "ping"
    if(message.content === 'ping'){
        // Send 'pong to the same channel
        message.channel.send('pong');
    }
});

// Log the bot in using the token from http://discord.com/developers/applications
client.login('');