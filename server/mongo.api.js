//using the mongodb driver
//var mongoose = require('mongoose')

//var url = 'mongodb://localhost:3000/';




//var db = new Db()
var database;
var postsCollection;
var MangoClient = require('mongodb').MongoClient; 
//var m = require('mongodb')

var getPostsCollection = function(db){
   // console.log(db);
   var database = db;
   
 
    //var dbresult =  database.collection('posts').find({}, {_id:0}).toArray().then(function(){;
   
    var dbresult =  database.collection('posts').find({}, {_id:0}).toArray(
        function (err, result){
            console.log(result);
            return result});
   // });
   // );
    
       
};
   
   

var dbConnect = function()
{ 
   try{
       //("mongodb://127.0.0.1:27017/blog");
       return MangoClient.connect("mongodb://blog-posts:mTtYNsHLRcNzaJuLkS0lMARrz4K1GgpTTZBpRGT9xNTF7q7HR7HA7vCHd0SlqhdKnVDAaVs7o2DOrXngOx5U0A==@blog-posts.documents.azure.com:10250/blog?ssl=true");
   }
   catch (e){
        console.log(e);

   }
}

var getDataPromise= function(db)
{
    var promise= new Promise(
        function(resolve, reject){
                  db.collection('posts').find({}, {_id:0}).toArray(
                  
                    function(err, result){
                            //console.log("getDataPromise: " + result);
                            
                            resolve(result);
              })
            })
    return promise;
}
exports.getAllPosts = function(){  
    

   return dbConnect().then (
       function(db) {
            return db.collection('posts').find({}, {_id:0}).toArray();//getDataPromise(db);
        });
}

exports.getPostById = function(_id){

    return dbConnect().then(
        function(db){
            return   db.collection('posts').findOne({id: parseInt(_id, 10)});
            /*return new Promise(
                db.collection('posts').findOne({id: parseInt(_id, 10)}, function(err, item){
                    resolve(item);
                });*/
        }

           /*return new Promise(
               function(resolve, reject){
                   var result = db.collection('posts').findOne({id: _id});
                   console.log("[collection.findOne] " + result);
                   resolve(result);
                  
                })
         }*/
    );
}


  


 

 
module.exports.getAllPosts();

