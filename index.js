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
server.use(session({secret:'Its a secret', resave:true, saveUninitialized:true, cookie: {secure: true}, genid: function(req){
    return this.genid;
}}));

var sess;
const port = 3000;
const cartArrayStore = [];
let rawData = '';
const cartArray = [];


server.get('/hello', (req, res) => {
    sess = req.session;
  loadJsonFile('./cartarray.json').then(json => {
   let array = json;
    res.sendStatus(array.length);
});
    
});

server.get('/cartcontents', (req, res) => {
  sess = req.session;
loadJsonFile('./cartarray.json').then(json => {
  console.log(json);
 let array = json;
  res.send(array);
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
    req.session.item;
    sess.cartContents;
    sess.item;
    sess.totalCart;
    req.session.item = req.body;
    cartArray.push(req.session.item);
    req.session.array = cartArray;

    //cartArray.push(req.session.item);

    //let cartText = JSON.stringify(item);
    sess.cartContents = JSON.stringify(cartArray);
    // console.log(req.session.array);
    // console.log(cartArray);
    sess.totalCart = cartArray.length;
   fs.writeFile('cartarray.json', sess.cartContents, {'flag':'w'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      res.status(200);
      console.log(cartArray.length.toString());
      res.send(sess.totalCart.toString());
      
      let total = JSON.parse(sess.cartContents);
      
});

server.delete('/clearAllCart', (req, res) => {
    cartArray.splice(0, cartArray.length);
      req.session.destroy(function(err){
        if(err){
           console.log(err);
        }else{
            console.log('hi');
           // res.redirect('/signup');
        }
     });
      //req.session.cartContents.destroy();

      res.status(200);
      res.send({ result: 'OK', message: 'Session destroyed' });

      fs.writeFile('cartarray.json', JSON.stringify(cartArray), {'flag':'w'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
});


server.listen(port, () => console.log(`app listening at port number ${port}`)); 
