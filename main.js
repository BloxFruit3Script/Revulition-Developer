const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fluxusKey = "b40b4b88624c9b493fc7180acd454675";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === '!your_command') {
    try {
      const response = await fetch(`https://fluxus.service.endpoint?key=${fluxusKey}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${fluxusKey}`
        }
      });
      const data = await response.json();
      message.channel.send(`Response from Fluxus: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('Error fetching data from Fluxus');
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
