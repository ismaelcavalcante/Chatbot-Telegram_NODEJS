const dialogflow = require('dialogflow');

const configs = require('./DigInnoOneBot.json');

const { project_id, private_key, client_email } = configs;

const sessionClient = new dialogflow.SessionsClient({
  project_id,
  credentials: {
    private_key,
    client_email,
  },
});

async function sendMessage(chatId, message) {
  const sessionPath = sessionClient.sessionPath(project_id, chatId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'pt-BR',
      },
    },
  };

  const response = await sessionClient.detectIntent(request);

  const result = response[0].queryResult;
  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields,
  };
}

module.exports.sendMessage = sendMessage;
