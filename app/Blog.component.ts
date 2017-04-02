import { Component } from '@angular/core';
import {Post} from './post';
import {PostDetailComponent} from './post-detail';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BlogService} from './Blog.service';
import {BlogPosts} from './blog.datasource';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {CreateBubbles} from './CreateBubbles';



//import { routing } from './AppRoutes';
//import {Router, Params} from '@angular/router'
export class Blog {

  subtitle: string;
  tags:Array<string>;

  Posts : Post[];

 
  
}


@Component({
  selector: 'blogs-list',
  ////<li *ngFor =" let post of Posts"><span>{{post.title}}</span>
   ///<post-detail [post]="post"></post-detail>   
  ///</li>
 moduleId: module.id,
  templateUrl:'blog.html',
  
  styleUrls:['blog.css']
                
,
  
 
    providers:[BlogService, CreateBubbles] // the injector relies on providers to create instances of the services
})
export class BlogComponent implements OnInit
{ 
  name = 'guest'; 
  title = 'this is my blog';
  
 
 blog: Blog={
    subtitle: 'what am i up to?',
    tags: ["post1","post2"],
    Posts:[]// [{id: 1, title:"abc", content:"dfa", category:"Art"}, 
   // {id:2, title:"post 2", content:"post 2 content", category:"Programming"}]
  }

constructor(private router:ActivatedRoute, private blogService:BlogService , private http: Http, private bubbleCreator:CreateBubbles){

 // this.route = Router;
  //  this.
}


  ngOnInit(){ 
    let me = this;

    let category= "";

   // $("")

    
    //this function can access variables declared in the constructor like route.
  //  me.
  // alert(BlogPosts);
  
    //me.bubbleCreator.getSeriesData();
    me.router.params.subscribe(params => {
        category = params["category"];

        if( category != null && category!=""){
         // alert(category);
         me.blog.Posts = me.blogService.getPostsByCategory(BlogPosts, category);

        }
        else {
       

           me.blogService.getAllPosts().subscribe(val=> { me.blog.Posts = val});;
          
        }

    });

  }

 // ngOnInit():void{alert("hello")}
 
}
