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
		.setName('show-message')
		.setDescription('Show the last X message sent by User')
        .addIntegerOption(option =>
            option.setName('number-of-message')
                .setDescription('The amount of message to show.(1-5)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('user-name')
                .setDescription('The name of the user')
                .setRequired(true)),
	async execute(interaction) {
		let num = interaction.options.get('number-of-message');
    let username = interaction.options.get('user-name');
    let duck = ''

    let i = num.value;
    if (num.value <=0) {
      i = 1;
    } else if (num.value > 5) {
      i = 5;
    }
    con.query("SELECT MESSAGE_CONTENT FROM MESSAGE m, USER u WHERE u.USER_NAME = '" + username.value + "' AND u.USER_ID = m.USER_ID ORDER BY MESSAGE_ID DESC LIMIT " + i, async function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
          await interaction.reply("Pas d'historique");
        } else {
          if (i > result.length) {
            i = result.length
          }
          let j = 1;
          for (i ; i > 0; i--) {
            duck += "Message " + (j) + " : " + result[i-1].MESSAGE_CONTENT + '\n';
            j++;
          }
          await interaction.reply(duck);
        }
    });
	},
};