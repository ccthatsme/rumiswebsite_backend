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
    //res.sendStatus(array.length);
});
    
});

server.get('/cartitemtotal', (req, res) => {
    sess = req.session;
    sess.totalCart;
    let array = null;
    loadJsonFile('./cartarray.json').then(json => {
        array = json;
        sess.totalCart = array.length;
        let num = sess.totalCart;
        //console.log(String(sess.totalCart));
        //console.log(JSON.parse({"total":sess.totalCart}));
        console.log(JSON.stringify({"total":sess.totalCart}));
        //  res.send(JSON.stringify({"total":sess.totalCart}));
         res.send(num.toString());
        
     }).catch((err) => console.log(err));
    //  console.log(sess.totalCart);
    //  res.send(sess.totalCart);
     
})

server.post('/additem', (req, res) => {
    sess = req.session;
    sess.cartContents;
    console.log(sess);
    const item = req.body;

    let cartText = JSON.stringify(item);
    sess.cartContents = JSON.stringify(item);
    console.log(sess.cartContents);
   fs.writeFile('cartarray.json', sess.cartContents, {'flag':'w'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      res.status(200);
      
      res.json(req.body);
      
})

server.listen(port, () => console.log(`app listening at port number ${port}`)); 
