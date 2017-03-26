const express = require('express');
 var http = require('http');
ObjectId = require('mongodb').ObjectID;

const app = express();
var server = http.createServer(app);

var mongoapi = require('./mongo.api.js');



app.use(function(req, res, next) {
 // res.header("Access-Control-Allow-Origin", "*");
///  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});


app.listen(process.env.PORT||2000, function() {
  console.log('listening on 2000')

   //console.log(JSON.stringify(mongoaip.getAllPosts()));
});

//app.set('views', __dirname + '');
//app.use('/hi', api);
app.get('/hi', function(req, res) {
// res.render('index.html')
  res.send('{"a": "Hello World"}')
});

app.get('/', function(req, res){

  mongoapi.getAllPosts().then
  (
    function (result){
      
      res.send(JSON.stringify(result));

    } 
  ); 
});

app.get('/Posts/:id', function(request, response){
  console.log("[app.get posts] " + request.params.id);
    mongoapi.getPostById(request.params.id).then(
      function(result){
        console.log(JSON.stringify(result));
        response.send(JSON.stringify(result));
      }

    );
}
);
app.param('category', function(req, res, next, id){


})



//module.exports = router;

/*
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//server.listen(port, () => console.log(`API running on localhost:${port}`));