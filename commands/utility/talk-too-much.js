const { SlashCommandBuilder } = require('discord.js');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "frank123",
  database: "frank"
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('talk-too-much')
		.setDescription('Give the username of the most active user in a specific channel')
        .addStringOption(option =>
            option.setName('channel-id')
                .setDescription('The id of the channel')
                .setRequired(true)),
	async execute(interaction) {
    let channelId = interaction.options.get('channel-id');

    con.query("SELECT u.USER_NAME, COUNT(MESSAGE_CONTENT) as MESSAGES FROM USER u, MESSAGE m WHERE u.USER_ID = m.USER_ID AND m.CHANNEL_ID = " + channelId.value + " GROUP BY u.USER_NAME ORDER BY MESSAGES DESC LIMIT 1", async function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
          await interaction.reply("Pas d'historique");
        } else {
          await interaction.reply(result[0].USER_NAME + " with " + result[0].MESSAGES + " messages(s)");
        }
    });
	},
};