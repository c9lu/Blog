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
    template:`<div class="column-center post">
    <p style="font-size:22px; color:white;font-family:Calibri">{{post?.title}}</p>
    <p style="font-size:18px; color:white; font-family:Calibri">Written on {{post?.createdate}}</p>
    <div [innerHtml]="myTemplate" style="color:white;font-family:Calibri; font-size:17px"></div></div>`,
    styles:[
            `@media screen and (min-width: 0px) and (max-width: 700px) {
                .post
                {
                        margin-left:-60px;
                       
                        padding-left:0px;
                        width:150%;
                }

                .entry-content img{
                        width:50%
                }
             
        }
   
         @media screen and (min-width: 701px) {
        .post
        { 
    
        z-index:0; 
        opacity:1;
       
        background-color:black;
       
        padding-left:6px;
        padding-right:6px
  

        }
        }

    



    `

    ],
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
                   

                        $.get('./_posts/post'+id+'.html', function(html_string){
                           me.myTemplate = html_string;
                      
                        })

                        if (id!=null)
                        {
                                $("#loader").hide();
                               me.blogService.getPostById(id).subscribe(p=>{
                                       me.post=p;
                                  
                                });
                           } 
                });
        
            
                
                        
        }
}

