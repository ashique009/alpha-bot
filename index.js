const express = require('express');
const app = express();

const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder 
} = require('discord.js');

const Groq = require('groq-sdk');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

client.once('clientReady', () => {
  console.log(`${client.user.tag} AI Bot is online 🚀`);
});


// MESSAGE COMMANDS
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  // ping
  if (message.content === '!ping') {
    return message.reply('Pong 🏓');
  }

  // !code command
  if (message.content.startsWith('!code')) {

    const question = message.content.slice(6);

    if (!question) {
      return message.reply('Ask a coding question 😄');
    }

    try {

      const completion =
        await groq.chat.completions.create({

          messages: [
            {
              role: 'system',
              content: 'You are a professional coding assistant.'
            },
            {
              role: 'user',
              content: question
            }
          ],

          model: 'llama-3.3-70b-versatile'

        });

      const answer =
        completion.choices[0]?.message?.content ||
        'No response';

      const embed = new EmbedBuilder()
        .setTitle('💻 ALPHA AI RESPONSE')
        .setDescription(answer)
        .setColor('Blue');

      message.reply({
        embeds: [embed]
      });

    } catch (error) {

      console.log(error);

      message.reply('AI error 😢');

    }
  }
});


// SLASH COMMANDS
client.on('interactionCreate', async interaction => {

  if (!interaction.isChatInputCommand()) return;

  await interaction.deferReply();

  let prompt = '';

  if (interaction.commandName === 'code') {

    const question =
      interaction.options.getString('question');

    prompt =
      `Answer this coding question:\n${question}`;

  }

  if (interaction.commandName === 'bugfix') {

    const code =
      interaction.options.getString('code');

    prompt =
      `Find and fix bugs in this code:\n${code}`;

  }

  if (interaction.commandName === 'explain') {

    const code =
      interaction.options.getString('code');

    prompt =
      `Explain this code in simple words:\n${code}`;

  }

  if (interaction.commandName === 'sql') {

    const query =
      interaction.options.getString('query');

    prompt =
      `Generate SQL query for:\n${query}`;

  }

  if (interaction.commandName === 'python') {

    const question =
      interaction.options.getString('question');

    prompt =
      `Generate Python code for:\n${question}`;

  }

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: 'system',
            content:
              'You are an expert developer AI assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],

        model: 'llama-3.3-70b-versatile'

      });

    const answer =
      completion.choices[0]?.message?.content ||
      'No response';

    const embed = new EmbedBuilder()
      .setTitle('💻 ALPHA AI RESPONSE')
      .setDescription(answer)
      .setColor('Blue');

    await interaction.editReply({
      embeds: [embed]
    });

  } catch (error) {

    console.log(error);

    interaction.editReply(
      'AI error 😢'
    );

  }

});

app.get('/', (req, res) => {
  res.send('ALPHA bot running 🚀');
});

app.listen(3000, () => {
  console.log('Server running');
});

client.login(process.env.TOKEN);