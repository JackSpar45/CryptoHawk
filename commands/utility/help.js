const { SlashCommandBuilder} = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available commands with their description'),

     async execute(interaction) {
        const commands = [
            {slNo:1, command:'/ping    ', description:'Checks if bot is active'},
            {slNo:2, command:'/list    ', description:'Lists the available cryptocurrency commands'},
            {slNo:3, command:'/bitcoin ', description:'Fetches details about Bitcoin'},
            {slNo:4, command:'/ethereum', description:'Fetches details about Ethereum'},
            {slNo:5, command:'/{cryptoName}', description:'Fetches details about a particular cryptocurrency'}];
       
            let helpMessage = '** Sl.No |  Command      |   Description**\n' ;
            helpMessage += '---------------------------------------------------------------------------------\n';
            commands.forEach(command =>{
                helpMessage += ` \`${command.slNo}   \` | \`${command.command}\`     |  ${command.description}\n` ;
            });
 
           
        await interaction.reply({
            content : helpMessage ,
            ephemeral : true
        });
     } ,

};