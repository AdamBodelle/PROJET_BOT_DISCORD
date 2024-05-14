const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('who_am_i')
		.setDescription('give the information of the User'),
	async execute(interaction) {
		await interaction.reply(
            'You are : ' + interaction.user.username + "\n" +
            'Your id is : ' + interaction.user.id +  "\n" +
            'Your avatar is : ' + interaction.user.avatar +  "\n" +
            'This server id is : ' + interaction.member.guild.id );
	},
};