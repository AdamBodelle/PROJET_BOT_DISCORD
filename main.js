const Discord = require('discord.js')
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, guildId, token, password } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "frank"
});

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

bot.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const commands = [];

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
      		bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}



const rest = new REST().setToken(token);


(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);


		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {

		console.error(error);
	}
})();

bot.on('ready', function () {
    console.log("Je suis connecté !")
})

bot.on('messageCreate', message => {
    if (message.author.bot) {
      return
    }
    else {
      con.query("SELECT USER_ID FROM USER WHERE USER_ID =" + message.author.id, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          if (result.length === 0) {
              con.query("INSERT INTO USER VALUES (" + message.author.id + ", '" + message.author.username + "')", function (err, result, fields) {
                  if (err) throw err;
              });
          }
      });
      con.query("SELECT SERVER_ID FROM SERVER WHERE SERVER_ID =" + message.guildId, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          if (result.length === 0) {
              con.query("INSERT INTO SERVER VALUES (" + message.guildId + ", null)", function (err, result, fields) {
                  if (err) throw err;
              });
          }
      });
      con.query("SELECT CHANNEL_ID FROM CHANNEL WHERE CHANNEL_ID =" + message.channelId, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          if (result.length === 0) {
              con.query("INSERT INTO CHANNEL VALUES (" + message.channelId + ", null ," + message.guildId + ")", function (err, result, fields) {
                  if (err) throw err;
              });
          }
      });
      con.query("INSERT INTO MESSAGE VALUES (" + message.id + ", \"" + message.content + "\", " + message.author.id + ", " + message.channelId + ")", function (err, result, fields) {
          if (err) throw err;
      });
    }
  })

bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

bot.login(token)