import { Component, Input } from '@angular/core';
import { Post } from './post';
import {OnInit, Directive} from '@angular/core';

@Component({
selector:'post-detail',
template:'<div> <h2 style="color:white">{{post.title}}</h2></div>' ,
})
//always need the class declaration for the component above!
export class PostDetailComponent implements OnInit{
    post:Post;


    ngOnInit(){


    }
}
