const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const fs = require('fs');
server.use(cors());
server.use(bodyParser.json())

const port = 3000;

server.get('/hello', (req, res) => res.send('Hello!'));

server.post('/additem', (req, res) => {
    const item = req.body;

    let cartText = JSON.stringify(item);

   fs.writeFile('cartarray.json', cartText, {'flag':'w'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      res.status(200);
      res.json(req.body);
})

server.listen(port, () => console.log(`app listening at port number ${port}`)); 
