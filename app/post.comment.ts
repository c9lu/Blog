import {EventEmitter, Output, Component, Input, OnChanges, SimpleChanges, animate, transition, style, state, trigger, OnInit, Directive} from '@angular/core';
import {Post} from './post';
import {BlogService} from './Blog.service';
import { ActivatedRoute, Params , Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import {comment} from './comment'


@Component({

    selector:'comments-area',

    templateUrl:'./app/post.comments.html'

})


export class PostCommentComponent implements OnInit, OnChanges{

     @Input() comments:Array<comment>;
    
   //  @Output() commentsCount = new EventEmitter();
     constructor(private blogService:BlogService, private route: ActivatedRoute){
      
     }
     
     SaveComment(value:any){
        let postid = 0;
        let me =this;
        this.route.params.subscribe(params=>{
            postid=params['id'];
        });
        let user = localStorage.getItem("chenplayground");
        let _comment :comment = new comment(postid, value.commentInput,  user, this.comments.length);
     
        this.blogService.savePostComments(_comment).subscribe((result)=>{
            
             me.blogService.getPostComments(postid).subscribe(response=>{
             me.comments = response;
            }
        
        )
            }
     );
    }
    deleteComment(postid:number, commetid:number){
       let me =this;
       this.blogService.deleteComment(postid, commetid).subscribe(()=>{

            me.blogService.getPostComments(postid).subscribe(response=>{
             me.comments = response;
       })
    });
    }
      ngOnInit(){
        $("#loader").hide();
        let id = 0;
        let me = this;
        this.route.params.subscribe(params=>{
            id=params['id'];
        })
        //me.blogService.getPostComments(id).subscribe(response=>{

           // this.comments = response;
         //   this.commentsCount.emit(this.comments.length);
         // }
      //  )
       
    }

    ngOnChanges(changes: SimpleChanges):void{

        //var commments = changes.currentValue;
        if(typeof (changes as any).comments.currentValue == "undefined"){

            this.comments= [];
        }
        else{
         this.comments = (changes as any).comments.currentValue; 
         
         //as Array<Comment>;
        }
    }
   
}