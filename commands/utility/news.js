const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { NEWS_API_KEY } = require('../../config.json');

const NEWS_URL = `https://cryptopanic.com/api/free/v1/posts/?auth_token=${NEWS_API_KEY}&public=true`;

module.exports = {
     data : new SlashCommandBuilder()
         .setName('news')
         .setDescription('Fetches latest news articles related to cryptocurrency'),

         async execute(interaction){
            try {
                 const response = await axios.get(NEWS_URL, { 
                    params:{
                        page:1
                    },
                 });

                 const articles= response.data.results;
                 if(!articles || articles.length === 0){
                    await interaction.reply({ content : 'No articles found' , ephemeral : true});
                    return;
                 }
                 let message = '**Latest Cryptocurrency News Articles:**\n\n';
                 const maxArticles = 5;
                 const maxMsgLength = 2000;

                 articles.slice(0, maxArticles).forEach((article, index) => {
                     message += `${index+1}.**${article.title}**\nPublished on ${new Date(article.published_at).toLocaleDateString()}\n[Read more.](${article.url})\nSource: ${article.source.title}\n\n`;
                 });

                if(message.length > maxMsgLength) {
                     message = message.slice(0, maxMsgLength - 3) + '...';    
                }
                await interaction.reply({content : message , ephemeral : true});
            }

            catch(error){
                 console.log(error);
                 await interaction.reply({ content:'There was an error fetching the news articles' , ephemeral:true});
            }
         }
};







