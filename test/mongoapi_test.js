var mongoapi = require('./../server/mongo.api.js');
var chai=require('chai');
var chaiAsPromised= require('chai-as-promised');
var expect= chai.expect;
var assert = chai.assert;

 describe("likePost",function(){
    it('using promise', function(){
     mongoapi.likePost(1).then((val)=>{
         console.log("fulfilled " + val);
     },
     (err)=>{
      console.log("rejected"+ err);
     
    }).catch(function(Err){
        
        console.log("update error "+Err);
    })
    

})

 });
describe("mongoapi should return the user saved", function(){

 
   beforeEach ( function(){

     mongoapi.deleteUsers();
      mongoapi.saveUser({
            'user':'testuser904', 'email':'chenlucircle@gmail.com',
            'subscribe':0 

        })
      
   
   });
 
    it('using callback', function(done){

        
          user = mongoapi.getUser_callback('testuser904', function(res){
                
              
                expect(res.user).equals("testuser904");
                 
               done();

          });
    }); 

    it('using promise', function(){

        
         return mongoapi.getUser('testuser904').then(function(res){
                 expect(
           
                    res.user
                ).equals("testuser904");
        
    
               
          });
    }); 

    it("using arrow function", ()=>{
   
      return mongoapi.getUser('testuser904').
       then((value) =>{
         expect(
           
            value.user
                ).equals("testuser904");
            
        });
    });
});


describe("it should also return the comment being saved", function(done){

    beforeEach(function(){

        let mockComment =  {
            author:'chen',
            content:'test save comment',
            id:6,
            postid:1
        } 
        mongoapi.saveComment(1, mockComment);

       done();
        
    });

    it("using promise", function() {
      return mongoapi.getCommentsById("1").then(function(res){
            
            expect(res[res.length-1].content).equals('test save comment');
            //expect(res.user).equals('chen');
            //expect(res.content).equals('test save comment');
            //    Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.

            //resolve(res);
        
        }).catch(function(err){
            
     //   })
       });

    })



})



describe("after deleting a comment entry, it should be one less than before", 
function(){
    let _length = 0;
    let _length2 =0; 
    beforeEach(function(){
        
       return mongoapi.getCommentsById(4).then(function(result){
            
            _length = result.postcomments.length;
            console.log("length before is "+ _length);           
        });
    })
    it("using promise", function(){
  
        return mongoapi.deleteComment(4,2).then(   
       
        function(){  

             return   mongoapi.getCommentsById(4)            
            .then(
                function(data){
                    _length2 = data.postcomments.length
                    console.log("length after is "+ _length2);
                    expect (_length2).equals(2)
                }
            )      
          }        
    );
    });
    it("using chai as Promised", function(){

        return mongoapi.deleteComment(4,2).then(   
       
        function(){  

             var result =  mongoapi.getCommentsById(4);      
             chai.should();
             chai.use(chaiAsPromised)   
           
            return expect(result.then(r=>r.postcomments)).to.eventually.have.length(2);
                 
          }
  
    );
}
    )})


