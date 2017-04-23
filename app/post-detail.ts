import {Component, Input, OnChanges,  animate, transition, style, state, trigger, OnInit} from '@angular/core';
import {Post} from './post';
import {BlogService} from './Blog.service';
import {Blog} from './Blog.component';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params , Router} from '@angular/router';

//import {Injectable} from 'angular'
@Component({
    selector:'post-detail',

   /* animations:[
    trigger('showPosts', [       
        state('shown', style({opacity: 1})),
        state('hidden', style({opacity: 0})),
        transition('shown => hidden', animate('1000ms')),    
        transition('hidden => shown', animate('1000ms'))                           
    ])
    ],*/
    template:`<div style="padding-left:10px; padding-right:10px;">
    <p style="font-size:22px; color:white;font-family:Calibri">{{post?.title}}</p>
    <p style="font-size:18px; color:white; font-family:Calibri">Written on {{post?.createdate}}</p>
    <div [innerHtml]="myTemplate" style="color:white;font-family:Calibri; font-size:17px"></div></div>`,
 
    
    providers:[BlogService]
    
        
})

export class PostDetailComponent implements OnInit{
        @Input() post: Post;
        
       
        myTemplate=''
        constructor(private blogService:BlogService, private route: ActivatedRoute){
        }
              
             
   
        
        ngOnInit(){ 
                let me = this;            
                let id=0;
                let posts: Post[] 
              
               
             
                  me.route.params.subscribe(params =>
                 {
                       id= params['id'];   
                        
                       $(".column-left").css("z-index", -1);
                       $(".column-right").css("z-index", -1);

                        $.get('./_posts/post'+id+'.html', function(html_string){
                           me.myTemplate = html_string;
                      
                        })

                        if (id!=null)
                        {
                               me.blogService.getPostById(id).subscribe(p=>{
                                       me.post=p;
                                  
                                });
                           } 
                });
        
            
                
                        
        }
}

