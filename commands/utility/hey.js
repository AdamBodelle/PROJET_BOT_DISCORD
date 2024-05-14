const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hey')
		.setDescription('Replies with Hey and what I think of our current relationship !'),
	async execute(interaction) {
		await interaction.reply('Hey :heart:');
	},
};