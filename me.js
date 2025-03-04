const { Client, IntentsBitField } = require('discord.js');
const { exec } = require('child_process');
require('dotenv').config();
const fs = require('fs');
const bfj = require('bfj');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`);

  // Run another script after 2 seconds
  setTimeout(() => {
    exec('node C:/Users/ofk20/Documents/discordcom/b.js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${err}`);
        return;
      }
      console.log('Backup complete');
    });
  }, 2000);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'cmd') {
    const command = interaction.options.get('command').value;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${err}`);
        interaction.reply(`Error: ${err.message}`);
        return;
      }
      interaction.reply(`Output: ${stdout}`);
    });
  } else if (interaction.commandName === 'ram') {
    const command = interaction.options.get('command').value;

    if (command === '0') {
      const dataFromInteraction = interaction.options.get('data').value;
      const data = typeof dataFromInteraction === 'string' ? dataFromInteraction : JSON.stringify(dataFromInteraction, null, 2);

      fs.writeFile('RAM.json', data, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          interaction.reply('Failed to write data to file.');
        } else {
          interaction.reply('Data written successfully.');
        }
      });
    } else if (command === '1') {
      try {
        const value = await bfj.read('RAM.json');
        interaction.reply(`RAM data: ${JSON.stringify(value, null, 2)}`);
      } catch (error) {
        console.error('Error reading file:', error);
        interaction.reply('Failed to read data from file.');
      }
    }
  }
});

client.login(process.env.TOKEN);
