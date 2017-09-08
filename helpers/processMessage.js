const apiAiClient = require('apiai')(process.env.API_AI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text },
		},
	});
};

module.exports = event => {
	const senderId = event.sender.id;
	const message = event.message.text;

	const apiaiSession = apiAiClient.textRequest(message, {
		sessionId: 'cat-dummy',
	});

	apiaiSession.on('response', response => {
		const result = response.result.fulfillment.speech;
		console.log('result', result);

		sendTextMessage(senderId, result);
	});

	apiaiSession.on('error', error => console.log(error));
	apiaiSession.end();
};
