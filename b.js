const { exec } = require('child_process');
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { stdout } = require('process');

console.log(`backup on`);

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
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rebot') {
    exec('node C:/Users/ofk20/Documents/discordcom/index.js', (err, stdout, stderr) => {
  if (err) {
     //node couldn't execute the command
    console.log(`err ${err}`);
    interaction.reply(`error: ${err}`);
  }

  // the *entire* stdout 
  interaction.reply(`reboted`);
  console.log(`stdout: ${stdout}`)});
  
}});

client.login(process.env.TOKEN);



  