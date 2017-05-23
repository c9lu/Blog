var mongoapi = require('./../server/mongo.api.js');
var chai=require('chai');
var expect= chai.expect;
var assert = chai.assert;

    
describe("mongoapi should return the user saved", function(){

 
   beforeEach ( function(){
        return mongoapi.saveUser({
            'user':'testuser904', 'email':'chenlucircle@gmail.com',
            'subscribe':0 

        })
      
    });
 
    it('using callback', function(done){

        
          user = mongoapi.getUser_callback('testuser904', function(res){
                
                 expect(
           
                    res.user
                ).equals("testuser904");
                 
                done();

          });
    }); 

    it('using promise', function(){

        
          mongoapi.getUser('testuser904').then(function(res){
                 expect(
           
                    res.user
                ).equals("testuser904");
        
    
               
          });
    }); 

    it("using arrow function", ()=>{
   
       mongoapi.getUser('testuser904').
       then((value) =>{
         expect(
           
            value.user
                ).equals("testuser904");
            
        });
    });
});



