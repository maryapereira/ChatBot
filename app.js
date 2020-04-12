const AssistantV1 = require('ibm-watson/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');
const { IamAuthenticator } = require('ibm-watson/auth');
const app = express();
const port = 3000;

app.use(bodyParser.json());


/*Dados da credencial Watson*/
const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({ apikey: 'C9vMop1tuMTSz1I6d2D1_ud3zjNm9woft51KKiIqFJ5T' }),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/d5f557af-bd93-4448-b820-98ce6f0a82d4',
  version: '2018-02-16'
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspaceId: '5174b70f-8fc8-4234-8d19-abe63e61e46c',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
