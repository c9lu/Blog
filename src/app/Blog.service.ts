import {Injectable} from '@angular/core';

import {BlogComponent} from "./Blog.component";
import {Post} from "./post";

import { Http, Response } from '@angular/http';
//require('rxjs');
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

   private results:Post[];

   constructor(private http: Http){
    // this.results = <Beh

   }
    
   private buildPostObjectFromJson(jsonString:any):Post{
        //    alert(jsonString.title);
            return new Post(Number(jsonString.id), jsonString.title, jsonString.image);
            
      }

     private buildPostObjectsFromJson(jsonArray:any):Post[]{
       let results = [];
        for (let element of jsonArray){
       //   alert(element.image);
          results.push(new Post(Number(element.id), element.title, element.image));
            
            }
            return results;
        }     

    private retrieveTagsFrequencyFromPosts(jsonArray:any): any {

        var frequencyMap = {};//{};
        let index =0;
        for(let element of jsonArray){
       //  alert(element.title);
            index = index+1;
            let obj = {};
            for(let t of element.tags){
                

                if(frequencyMap[t]==null)
                frequencyMap[t]=  1
                else frequencyMap[t] = frequencyMap[t]+1;
            }

        }
        return frequencyMap;
    }  
    getPostById(id: number){
       //return  posts.find(x=> x.id==id);
       return this.http.get('http://localhost:2000/Posts/'+id).map(
        response=> {
        //  alert(response.json());
         return this.buildPostObjectFromJson(response.json());
        }
    
      );
       // return app('')
    } 

    getPostsByCategory(posts:Post[], category:string): Post[]
    {
       return posts.filter(p=>p.category == category);
     
    }
    getAllPostsTags_Frequency(){
      
        return this.http.get('http://localhost:2000/').map(response=>{
           
            return this.retrieveTagsFrequencyFromPosts(response.json());
        });
    }
    getAllPosts()
    {
           return this.http.get('http://localhost:2000/').map(response=>{
           
              return this.buildPostObjectsFromJson(response.json());

           }); 
           
    }
    

}
