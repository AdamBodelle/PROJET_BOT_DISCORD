const Discord = require('discord.js')
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, guildId, token, password } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

con.connect(function(err) {
    if (err) throw err;
});
  
const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ],
})

bot.on('ready', function () {
    console.log("Je suis connecté !")
})

bot.login(token)