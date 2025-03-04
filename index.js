const { Client, IntentsBitField, } = require('discord.js');
const { exec } = require('child_process');
require('dotenv').config();
const { stdout } = require('process');
const { register } = require('./tools');
const { parse } = require('path');
const fs = require('fs').promises; //here fix
const bfj = require('bfj');
const path = require('path');
const { ApplicationCommandOptionType } = require('discord.js');
const { GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { error } = require('console');
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.channel_id;


async function deleteFilesInFolder(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = await fs.stat(filePath);

            if (stat.isFile()) {
                await fs.unlink(filePath);
                console.log(`Deleted file: ${filePath}`);
            } else if (stat.isDirectory()) {
                await deleteFilesInFolder(filePath);
                await fs.rmdir(filePath);
                console.log(`Deleted folder: ${filePath}`);
            }
        }

        console.log(`All files in folder "${folderPath}" have been deleted`);
    } catch (err) {
        console.error(`Error deleting files in folder "${folderPath}":`, err);
    }
}
deleteFilesInFolder('RAM');


const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ],
   catch (error) {
    console.log(error)
  }})
  
  
  client.on('ready', async (c) => {
    console.log(`${c.user.tag} is online.`);
    exec('node C:/Users/ofk20/Documents/discordcom/b.js', (err, stdout, stderr) => {
        if (err) {
           //node couldn't execute the command
          console.log(`err ${err}`)};
       
           // the *entire* stdout 
           console.log(`backup`)});        
  });
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === 'register_account') {
        register (interaction.options.get('server_id'))
        interaction.reply('Trying')
      }
      if (interaction.commandName === 'alu') {
      const num1 = interaction.options.get('first-number').value;
      const num2 = interaction.options.get('second-number').value;
      if (interaction.options.get('action').value === 1) {
      interaction.reply(`${num1 + num2}`)}
      if (interaction.options.get('action').value === 2) {
        interaction.reply(`${num1 - num2}`)}
      if (interaction.options.get('action').value === 3) {
        interaction.reply(`${num1 * num2}`)}
      if (interaction.options.get('action').value === 4) {
        interaction.reply(`${num1 / num2} `)}

        if (interaction.options.get('action').value === 5) {
          if (num1 === num2) {
            interaction.reply(`1`)
          }
          if (num1 > num2) {
            interaction.reply(`2`)
          }
          if (num1 < num2) {
            interaction.reply(`3`)
          }
        }
    };
      if (interaction.commandName === 'ram') {
      const path = `RAM/${interaction.options.get('location').value}.JSON`
      const command = (interaction.options.get('write_read').value)
       if (interaction.options.get('write_read').value === '1') {
        const dataFromInteraction = interaction.options.get('data').value;
        const data = typeof dataFromInteraction === 'string' ? dataFromInteraction : JSON.stringify(dataFromInteraction, null, 2);
        interaction.reply('done')
          console.log('RAM')
        fs.writeFile( path, data, (err) => {
          if (err) { 
            console.error('Error writing to file:', err);
            interaction.reply(err)}
          
        });
      } else if (command === '0') {
        try {
          const value = await bfj.read(path);
          interaction.reply(JSON.stringify(value, null, 2));
        } catch (error) {
          console.error('Error reading file:', error);
          interaction.reply(`Failed to read data from file. ${error}` );
        }
      }
    }
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === 'register_account') { 
const commands = [
  {
    name: 'rebot',
    description: 'backup',

  },
  {
    name: 'ram',
    description: 'ram',
    options: [
      {
        name: 'location',
        description: 'location',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'write_read',
        description: 'write read 1 0',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'write',
            value: '1',
          },
          {
            name: 'read',
            value: '0',
          },
        ]
      },
      {
        name: 'data',
        description: 'data',
        type: ApplicationCommandOptionType.String,
        required: false,
      }]
    },
    {
      name: 'alu',
      description: 'alu',
      options: [
      {
        name: 'action',
        description: 'action',
        choices: [
          {
            name: 'add',
            value: '1'
          },
          {
            name: 'subtract',
            value: '2'
          },
          {
            name: 'multiply',
            value: '3'
          },
          {
            name: 'divide',
            value: "4"
          },
          {
            name: 'flags',
            value: '5'
          }
        ],
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'first-number',
        description: 'The first number.',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'second-number',
        description: 'The second number.',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
     ],
   },
]
    
  

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
      }})
  
client.login(process.env.TOKEN);  