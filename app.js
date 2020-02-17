const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

/*const AssistantV1 = require('watson-developer-cloud/assistant/Assistant-Assemble-Food');*/

/*Dados da credencial Watson*/

const assistant = new AssistantV1({
  username: 'Auto-generated service credentials',
  password: 'C9vMop1tuMTSz1I6d2D1_ud3zjNm9woft51KKiIqFJ5T',
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/d5f557af-bd93-4448-b820-98ce6f0a82d4',
  version: '2020-02-15',
});

/*https://api.us-south.assistant.watson.cloud.ibm.com/instances/d5f557af-bd93-4448-b820-98ce6f0a82d4*/
/*url: 'https://gateway.watsonplatform.net/assistant/api/',*/

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'https://api.us-south.assistant.watson.cloud.ibm.com/instances/d5f557af-bd93-4448-b820-98ce6f0a82d4/v1/workspaces/6d48cd85-4821-4eb0-b3f2-a14baefc5c9f/message',
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