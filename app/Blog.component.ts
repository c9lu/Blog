import { Component } from '@angular/core';
import {Post} from './post';

import {OnInit, Directive} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BlogService} from './Blog.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {CreateBubbles} from './CreateBubbles';
var $ = require("jquery");


export class Blog {

  subtitle: string;

  Posts : Post[];

 
  
}


@Component({
  selector: 'blogs-list',

  moduleId: module.id,
  templateUrl:'blog.html',  
  styleUrls:['blog.css'],
  providers:[BlogService, CreateBubbles] // the injector relies on providers to create instances of the services
})
export class BlogComponent implements OnInit
{ 
  name = 'guest'; 
  title = 'this is my blog';
 
 blog: Blog={
    subtitle: "Hello guest, what am I up to?",
  
    Posts:[]
  }
    
constructor(private activatedRoute:ActivatedRoute, private router:Router ,private blogService:BlogService , private http: Http, private bubbleCreator:CreateBubbles){

 
}

 

 ngAfterViewInit(){
   let me= this;
  setTimeout(function(){
 
    $(".bubbles").click(function(e){

    
      var tag = $(this).attr('id');
     
      me.router.navigate(['/Tags', tag]);


    })
   },1000);
 }

  ngOnInit(){ 
    let me = this;

    let id= "";

        
     

    me.activatedRoute.params.subscribe(params => {
        id = params["id"];
        $(".column-left").css("z-index", 0);
        $(".column-right").css("z-index", 0);
         
        if(me.router.url.indexOf('Tags')>0)
       {
          var result = me.blogService.GetPostsFromTagName(id);
          
          if(typeof result!='undefined' && result!=null){
            result.subscribe(val=> { 
          
                me.blog.Posts = val  })

          }
          else{
             me.router.navigate(['']) 
          }
       }
        else if( id!= null && id!=""){
        
      
          me.blogService.getPostsByCategory(id).subscribe(val=> { me.blog.Posts = val} );
        }
        else {
          
           me.blogService.getAllPosts().subscribe(val=> { me.blog.Posts = val
              
            
          });
          
        }

    });

  }


 
}
