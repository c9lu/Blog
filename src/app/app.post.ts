import { Component, Input } from '@angular/core';
import { Post } from './post';

@Component({
selector:'post-detail',
template:'<div> <h2>{{post.title}}</h2></div>' ,
})
//always need the class declaration for the component above!
export class PostDetailComponent{
    post:Post;

}
