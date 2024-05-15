const { SlashCommandBuilder } = require('discord.js');
var mysql = require('mysql');
const { password, username, database } = require('../../config.json');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: username,
  password: password,
  database: database
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('how-much-messages')
		.setDescription('Show the number of messages sent by each user in a channel')
        .addStringOption(option =>
            option.setName('channel-id')
                .setDescription('The id of the channel')
                .setRequired(true)),
	async execute(interaction) {
	let channelId = interaction.options.get('channel-id');
    let duck = 'Nombre de messages envoyés par : \n'
    con.query("SELECT u.USER_NAME, COUNT(m.MESSAGE_ID) as AMT FROM USER u, MESSAGE m WHERE m.USER_ID = u.USER_ID AND m.CHANNEL_ID = " + channelId.value + " GROUP BY u.USER_NAME ORDER BY AMT DESC", async function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
          await interaction.reply("Pas d'historique");
        } else {
          for (i = 0 ; i < result.length; i++) {
            duck += result[i].USER_NAME + " : " + result[i].AMT + '\n';
          }
          await interaction.reply(duck);
        }
    });
	},
};