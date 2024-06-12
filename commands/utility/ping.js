const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Ping CryptoHawk!!'),

    async execute(interaction){
    await interaction.reply('Bot CryptoHawk is Active!!');
    },
};
