const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [

  {
    name: 'code',
    description: 'Ask coding questions',
    options: [
      {
        name: 'question',
        description: 'Your coding question',
        type: 3,
        required: true
      }
    ]
  },

  {
    name: 'bugfix',
    description: 'Fix coding bugs',
    options: [
      {
        name: 'code',
        description: 'Paste your buggy code',
        type: 3,
        required: true
      }
    ]
  },

  {
    name: 'explain',
    description: 'Explain code',
    options: [
      {
        name: 'code',
        description: 'Paste code to explain',
        type: 3,
        required: true
      }
    ]
  },

  {
    name: 'sql',
    description: 'Generate SQL queries',
    options: [
      {
        name: 'query',
        description: 'Ask SQL question',
        type: 3,
        required: true
      }
    ]
  },

  {
    name: 'python',
    description: 'Generate Python code',
    options: [
      {
        name: 'question',
        description: 'Ask Python question',
        type: 3,
        required: true
      }
    ]
  }

];

const rest = new REST({ version: '10' })
  .setToken(process.env.TOKEN);

(async () => {

  try {

    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(
        '1501818613974171779'
      ),
      { body: commands }
    );

    console.log('Slash commands registered!');

  } catch (error) {

    console.log(error);

  }

})();