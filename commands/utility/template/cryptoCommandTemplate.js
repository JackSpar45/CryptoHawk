const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');

const { API_KEY } = require('../../../config.json');
const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const LOGO_URL = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info'

module.exports = (cryptoName) => ({
    data: new SlashCommandBuilder()
    .setName(cryptoName)
    .setDescription(`Fetches details for ${cryptoName}`),

    async execute(interaction){
         try {
            const response = await axios.get(API_URL, {
                headers:{
                    'X-CMC_PRO_API_KEY':API_KEY,
                },
                params:{
                   slug: cryptoName.toLowerCase()
                }
            });

         const key = Object.keys(response.data.data)[0];
            const data = response.data.data[key];

          if(!data){
            await interaction.reply({
                content: `No details found for ${cryptoName}`,
                ephemeral : true
            });
            return;
           } 

           //Fetch Logo
           const logoResponse  = await axios.get(LOGO_URL,{
               headers: {
                  'X-CMC_PRO_API_KEY': API_KEY,
               },
               params:{
                   slug: cryptoName.toLowerCase(),
               },
           });
          
           const logoKey = Object.keys(logoResponse.data.data)[0];
           const logoData = logoResponse.data.data[logoKey];
           const logoUrl =logoData.logo;  

           const volumeChange = data.quote.USD.volume_change_24h;
           const volumeChangeText = volumeChange < 0 
                ? `\`\`\`diff\n- Volume Change 24h: ${volumeChange}\`\`\`` // Red text using diff syntax
                : `\`\`\`diff\n+ Volume Change 24h: ${volumeChange}\`\`\``; // green text 

           // Create embed message
      const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${data.name} (${data.symbol})`)
      .setThumbnail(logoUrl)
      .addFields(
        { name: 'Name', value: `${data.name}`, inline: true },
        { name: ' Symbol', value: ` ${data.symbol}`, inline: true },
        { name: ' Current Price', value: ` $${data.quote.USD.price}`, inline: true },
        { name: 'Crypto Rank', value: `${data.cmc_rank}`, inline: true },
        { name: ' Market Cap', value: ` $${data.quote.USD.market_cap}`, inline: true },
        { name: 'Total Supply', value: `${data.total_supply}`, inline: true },
        { name: 'Max Supply', value: `${data.max_supply}`, inline: true },
        { name:' ' , value: volumeChangeText },
        { name: 'Last Updated', value: data.quote.USD.last_updated }
      );
     
      const thumbnailSize = 64; // Desired size in pixels
      embed.setThumbnail(logoUrl, thumbnailSize, thumbnailSize);
   
    await interaction.reply({ embeds: [embed], ephemeral: true });
      
         } 
         catch (error){
              console.log(error);
              await interaction.reply({
                content:'There was an error fetching the cryptocurrency details',
                ephemeral: true
              });
         }
    },
}); 
