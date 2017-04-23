import {Injectable} from '@angular/core';

import {BlogComponent} from "./Blog.component";
import {Post} from "./post";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

var  frequencyMap ;
@Injectable()
export class BlogService {

   private results:Post[];
   private apiURL = environment.webApiURL;
  
   constructor(private http: Http){
   
   }

  
   private buildPostObjectFromJson(jsonString:any):Post{
       
            return new Post(Number(jsonString.id), jsonString.title, jsonString.image, jsonString.html, jsonString.createdate);
            
      }

     private buildPostObjectsFromJson(jsonArray:any):Post[]{
       let results = [];
        for (let element of jsonArray){
  
          results.push(new Post(Number(element.id), element.title, element.image, element.content, element.createdate));
            
            }
            return results;
        }     
   
    
    private retrieveTagsFrequencyFromPosts(jsonArray:any): any {

        frequencyMap = {};//{};
        let index =0;
        for(let element of jsonArray){
      
            index = index+1;
            let obj = {};
            for(let t of element.tags){
                
                if(t.indexOf(' ')>0){
                    t = t.replace(' ','_');
                }

                if(frequencyMap[t]==null){
                    frequencyMap[t] = {count:1, PostIDs:[]}
                
                    frequencyMap[t].PostIDs.push(element.id);
                }
                else {
                    frequencyMap[t].count = frequencyMap[t].count+1;
                    frequencyMap[t].PostIDs.push(element.id);
                }
            }

        }
        return frequencyMap;
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
          if(frequencyMap==null ||frequencyMap[tagName]==null){
            return null;             
          }      
          else
          {
            postIDs = frequencyMap[tagName].PostIDs.join("_");
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
           
            return this.retrieveTagsFrequencyFromPosts(response.json());
        });
    }
    getAllPosts()
    {
           return this.http.get(this.apiURL+'/').map(response=>{
           
              return this.buildPostObjectsFromJson(response.json());

           }); 
           
    }
    

}
