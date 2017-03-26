import {Component, Input, OnChanges,  animate, transition, style, state, trigger, OnInit} from '@angular/core';
import {Post} from './post';
import {BlogService} from './Blog.service';
import {Blog} from './Blog.component';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params , Router} from '@angular/router';
import {BlogPosts} from './blog.datasource';
//import {Injectable} from 'angular'
@Component({
    selector:'post-detail',

    animations:[
    trigger('showPosts', [       
        state('shown', style({opacity: 1})),
        state('hidden', style({opacity: 0})),
        transition('shown => hidden', animate('1000ms')),    
        transition('hidden => shown', animate('1000ms'))                           
    ])
    ],
    template:`<div [@showPosts]="visibility">,

            <h2>{{post?.title}}</h2>
            <br/>
            <h1>{{post?.content}}</h1>
            </div>

            `, 
    providers:[BlogService]
    
        
})

export class PostDetailComponent implements OnInit{
        @Input() post: Post;
        visibility = 'hidden'

        constructor(private blogService:BlogService, private route: ActivatedRoute){
        }
              
             
             //  ( blogService.getPostById(id).subscribe
  //              .subscribe(post=>me.post = post
             //   );
        //      this.route.params.switchMap((params: Params) => 
          //   blogService.getPostById(+params['id'])).subscribe((post:Post)=>this.post = post)

          
        
        ngOnInit(){ 
                let me = this;
               //  me.route.params.subscribe(params => {
                  let id=0;
                  //the params is from ActivatedRoute
                 let posts: Post[] 
                // posts = new Blog().Posts;
               
               // posts = BlogPosts
             
                  me.route.params.subscribe(params =>
                 {
                          id= params['id'];   
                          if (id==null){
                               
                          }
                          else{
                               me.blogService.getPostById(id).subscribe(p=>{
                                       me.post=p;
                                });
                           } });
        
            
                
                setTimeout(function () {
                        me.visibility = 'shown';
                },500);                
        }
}

