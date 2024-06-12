const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const cryptoCommandTemplate = require('./commands/utility/template/cryptoCommandTemplate');

const cryptocurrencies = [
	  'bitcoin', 'ethereum', 'bnb', 'solana', 'shiba-inu', 'avalanche', 'litecoin', 'dogecoin', 'ripple',
    'cardano', 'polkadot', 'chainlink', 'uniswap', 'binancecoin',
    'pepe','worldcoin', 'ethereum-classic','monero', 'aptos', 'usd-coin', 'wrapped-bitcoin', 'aave', 'cosmos',
    'bitcoin-cash', 'tezos', 'filecoin', 'neo'
];
//Generate cryptocurrency commands
 cryptocurrencies.forEach(cryptoName => {
       const command  = cryptoCommandTemplate(cryptoName);
	   commands.push(command.data.toJSON());     
 });  


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct an instance of the REST module
const rest = new REST().setToken(token);

// deploy the commands 
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