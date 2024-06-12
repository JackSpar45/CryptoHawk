const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
       .setName('list')
       .setDescription('Gives a list of specific commands '),

       async execute(interaction) {
            const cryptocurrencies = [
                'bitcoin', 'ethereum', 'bnb', 'solana', 'shiba-inu', 'avalanche', 'litecoin', 'dogecoin', 'ripple',
    'cardano', 'polkadot', 'chainlink', 'uniswap', 'binancecoin',
    'pepe','worldcoin', 'ethereum-classic','monero', 'aptos', 'usd-coin', 'wrapped-bitcoin', 'aave', 'cosmos',
    'bitcoin-cash', 'tezos', 'filecoin', 'neo'
            ];
            const commands = cryptocurrencies.map(name => `\`/${name}\``);

            const listMessage = 'Available cryptocurrency commands:\n' + '*' + commands.join('\n*');

            await interaction.reply({
                content : listMessage,
                ephemeral : true   
            });
       },
};