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
		.setName('random-message')
		.setDescription('Return a random message sent by an user !')
        .addStringOption(option =>
            option.setName('user-id')
                .setDescription('The id of the user')
                .setRequired(true)),
	async execute(interaction) {
    let userId = interaction.options.get('user-id');

    con.query("SELECT MESSAGE_CONTENT FROM MESSAGE m WHERE m.USER_ID = " + userId.value + " ORDER BY RAND() LIMIT 1", async function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
          await interaction.reply("Pas d'historique");
        } else {
          await interaction.reply("Message : " + result[0].MESSAGE_CONTENT);
        }
    });
	},
};