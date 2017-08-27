import {Injectable} from '@angular/core';

import {BlogComponent} from "./Blog.component";
import {Post} from "./post";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {comment} from "./comment";
import {getFreqObj} from "./app.functions";


@Injectable()
export class BlogService {

   private results:Post[];
   private apiURL = environment.webApiURL;
   public  frequencyMap ={};
   constructor(private http: Http){
     
   }

  
   private buildPostObjectFromJson(jsonString:any):Post{
       
            let post = new Post(Number(jsonString.id), jsonString.title, jsonString.image, jsonString.html, jsonString.createdate);
            post.comments = jsonString.postcomments;
            return post;
      }

     private buildPostObjectsFromJson(jsonArray:any):Post[]{
       let results = [];
        for (let element of jsonArray){
  
          results.push(new Post(Number(element.id), element.title, element.image, element.content, element.createdate));
            
            }
            return results;
        }     
    
    /* private retrievePostComments(jsonArray:any):any{
         let frequencyMap = {};
        
             
          //  if(element.postcomments.length!=null && element.postcomments.length>0){
        frequencyMap = jsonArray.map((element)=>{
                 return   getFreqObj(frequencyMap, element, "title", element.postcomments!=null? element.postcomments.length:0);
                     

                });
       
         

     }*/
    public savePostComments(comment):any{

       var result= this.http.post(this.apiURL+'/savecomment',comment);
       return result;
    }
    private retrieveTagsFrequencyFromPosts(jsonArray:any): any {

       
    let index =0;
    let self=this;
    if(JSON.stringify(self.frequencyMap)=='{}'){//typeof(this.frequencyMap)=='undefined'){
  //      this.frequencyMap={};
        jsonArray.forEach((post)=>{
            
          post.tags.forEach((tag)=>{
            tag= tag.replace(' ','_');
            self.frequencyMap=  getFreqObj (self.frequencyMap, post, tag, 1, 0)
            })
        
          if(typeof(post.postcomments)!='undefined'&& post.postcomments!=null){
            post.postcomments.forEach((comment)=>{
            self.frequencyMap = getFreqObj(self.frequencyMap, post, post.title, 1,1 )
            })
            }           
       
     });
    }
        return self.frequencyMap;
    }  
    getPostById(id: number){
      
       return this.http.get(this.apiURL+'/Posts/'+id).map(
        response=> {
     
         return this.buildPostObjectFromJson(response.json());
        }
    
      );
     
    } 
   GetPostsFromTagName (tagName:string){

          var postIDs = [];
          if(this.frequencyMap==null ||this.frequencyMap[tagName]==null){
            return null;             
          }      
          else
          {
            postIDs = this.frequencyMap[tagName].PostIDs.join("_");
          }
           return this.http.get(this.apiURL+ '/MPosts/'+postIDs).map(
            response=> {
                       
            return this.buildPostObjectsFromJson(response.json());
            }    
        ); 
    }
    getPostsByCategory(category:string)
    {
       
        return this.http.get(this.apiURL + '/Category/'+category).map(
        response=> {
        
         return this.buildPostObjectsFromJson(response.json());
        }
    
      );
      
     
    }
    getAllPostsTags_Frequency(){
      
        return this.http.get(this.apiURL+ '/').map(response=>{
           
            this.frequencyMap =  this.retrieveTagsFrequencyFromPosts(response.json());
            return this.frequencyMap;
        });
    }
    getAllPosts()
    {
           return this.http.get(this.apiURL+'/').map(response=>{
           
              return this.buildPostObjectsFromJson(response.json());

           }); 
           
    }
    getPostComments(postID:Number){
           return this.http.get(this.apiURL+'/Comments/'+postID).map(response=>{

               return this.buildCommentObjects(response.json());
           })

    }

    buildCommentObjects(jsonObject:any):comment[]{
        
        let comments : comment[] = new Array<comment>();
        for(let pc of jsonObject[0].postcomments){
            if(pc.author==null || pc.author==""){
                pc.author = "Anonymous";
            }
            var c = new comment(Number(pc.postid),pc.content, pc.author , pc.id);
            comments.push(c);
        }
       
        
        return comments;
    }

    deleteComment(_postid:number, _commentid:number){
        let comment ={postid: _postid, commentid: _commentid}
        return this.http.post(this.apiURL +'/deletecomment', comment );
    }

}
