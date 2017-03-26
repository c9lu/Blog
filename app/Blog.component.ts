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
  template: `
  
  <h3 [innerText]="name"></h3>
  <h1 align="center">Hello {{name}} {{blog.subtitle}}</h1>
  <div align="center">
<ul>
    <li>
  <a [routerLink]="['', 'Programming']">   
  <svg viewBox='0 0 105 105' height="150" width="300" style="display:block, margin:auto">
   <g>
  <path d='M 0,60 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z' fill="#33CAFF"/>
  <path d='M 45,50 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z' fill="#33CAFF"/>
            <text fill="white" text-anchor="middle" y="75" x="40">Programming</text>
    </g>
    </svg>
  </a>  
  </li>   
  <li>
  
     <a [routerLink]="['','Art']" >
    
    <svg viewBox='150 0 105 105' height="150" width="300">
   
     <path d='M 150,60 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z' fill="#33CAFF"/>
     <text fill="white" text-anchor="middle" y="75" x="166">Art work</text>
    </svg>
    </a>
    </li>

    
    <li>Recent posts</li>
    <li>
  </ul>
  </div>

  <div  *ngFor="let post of blog.Posts" class="posts">
  <div align="center">
      <a [routerLink]="['/Posts', post.id]">
      {{post.title}}
      </a>
   <br/>
      <img src="Images/{{post.image}}.jpg" width="250" />
  <br/>
  </div>

  </div>
    
  `
  ,
  styles:['ul {list-style-type:none} li {float:left} .posts {clear:both}'], 
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
