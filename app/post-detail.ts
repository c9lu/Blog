import {Component, Input, OnChanges,  animate, transition, style, state, trigger, OnInit} from '@angular/core';
import {Post} from './post';
import {BlogService} from './Blog.service';
import {PostCommentComponent}from './post.comment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params , Router} from '@angular/router';
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll/ng2-simple-page-scroll';
import {comment} from './comment'
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
    ],
     <comments-area (commentsCount)="onNotify($event)"></comments-area>*/
    template:`<div class="app post">
    
    <p style="font-size:22px; color:white;font-family:Calibri">{{post?.title}}</p>
    <div>
    <p style="float:left ;font-size:18px; color:white; font-family:Calibri" *ngIf="post?.createdate!=''">Written on {{post?.createdate}}</p>
    <span style="color:aqua; float:right" *ngIf="comments?.length>0 && comments?.length<2">{{comments?.length}} comment</span>
    <span style="color:aqua; float:right" *ngIf="comments?.length>1">{{comments?.length}} comments</span>
    <a simplePageScroll href="#commentssection" style="display:none"></a>
    </div>
    
    <div [innerHtml]="myTemplate" style="color:white;font-family:Calibri; font-size:17px; width:100%; clear:both"></div></div>
    <div id="commentssection">
       <comments-area [comments]="comments"></comments-area>
    </div>
    `,
    styles:[
            `
          
   @media screen and (min-width: 801px) {



   .post
                {
                        
                        width:100%;
                        margin-right:0;
                        margin-left:0;
                        
                }
}

    `

    ]
    //providers:[BlogService]
    
        
})

export class PostDetailComponent implements OnInit{
        
        
        commentsCount:string;
        
        comments: Array<comment>;
        post: Post;
        myTemplate=''
        constructor(private blogService:BlogService, private route: ActivatedRoute){
        }
              
             
   
        onNotify(message:string):void{
                //alert(message);
                this.commentsCount = message;
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
                                       me.comments = p.comments;
                                  
                                });
                           } 
                });
        
            
                
                        
        }
}

