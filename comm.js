require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

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
   {
    name: 'register_account',
    description: 'make an account',
    options: [
      {
        name: 'server_id',
        description: 'server id',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
   },
];
    
  

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