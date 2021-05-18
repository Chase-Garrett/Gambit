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
    console.log('I am ready!');
});

//Create a listener for messages
client.on('message', message => {
    // If the message is "-help" or "-h"
    if(message.content === `${prefix}help` || message.content === `${prefix}h`){
        // Print list of commands
        message.channel.send('```\n-roll xdy replace x with number of dice to roll and y with sides on the dice' +
        '\n```');
    }else if(message.content.startsWith(`${prefix}roll`)) { // takes -roll command and returns a value based on the dice rolled
        let input = message.content;
        let args = input;
        let command;
        try{
            args = input.slice(prefix.length).trim().split(/ +/);
            console.log('args try ' + args)
            command = args[1].split('d');
            console.log('command try ' + command)
        }
        catch(err){
            args = input.slice(prefix.length).slice('roll').trim();
            console.log('args catch ' + args)
            command = args[1].split('d');
            console.log('command catch ' + command)
        }
        //let command = args[1].split('d');
        console.log('before if statement');
        console.log(args);
        console.log(command);

        //If statement that locks in the number of rolls for a given command
        if(parseInt(command[0]) <= 100){
            let dice = new DiceRoll(parseInt(command[0]), parseInt(command[1]));
            console.log('in if statement');
            console.log(args);
            console.log(command);

            // switch statement to determine allowable dice
            switch(parseInt(command[1])){
                case 4:
                case 6:
                case 8:
                case 10:
                case 12:
                case 20:
                    message.channel.send(dice.roll())
                    break;
            }
        } else{
            message.channel.send('You are trying to roll to many dice!');
        }
    }
});

// Log the bot in using the token from http://discord.com/developers/applications
client.login(token);