const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const fs = require('fs');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const loadJsonFile = require('load-json-file');

server.use(cors());
server.use(bodyParser.json());
//server.use(cookieParser);
server.use(session({secret:'Its a secret', resave:'false', saveUninitialized:'true'}));

var sess;
const port = 3000;
const cartArrayStore = [];
let rawData = '';


server.get('/hello', (req, res) => {
    sess = req.session;
  loadJsonFile('./cartarray.json').then(json => {
   let array = json;
    res.send(array[0]);
});

    
});

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
