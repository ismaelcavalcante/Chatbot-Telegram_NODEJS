const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
const { token } = require('./telegram-config.json');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function (msg) {
  const chatId = msg.chat.id;
  console.log(msg.text);

  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  console.log(dfResponse);

  let responseText = dfResponse.text;

  if (dfResponse.intent === 'linguagem de programação') {
    responseText = await youtube.searchVideoURL(
      responseText,
      dfResponse.fields.number.numberValue
    );
  }

  bot.sendMessage(chatId, responseText);
});
