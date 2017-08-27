//var mongoose = require("./mango.api.js")
import { Component , ViewChild} from '@angular/core';

import {rightBubbles} from './CreateBubbles';
import {leftBubbles} from './CreateBubbles';
import {User} from './user';
import {AuthService} from './AuthenticationService';
import {AppHeader} from './app.header';
import {BlogService} from './Blog.service';

//https://github.com/angular/angular/issues/10646
@Component({
  selector: 'my-app-2',
  ////<li *ngFor =" let post of Posts"><span>{{post.title}}</span>
   ///<post-detail [post]="post"></post-detail>   
  ///</li>
  moduleId: module.id,
  templateUrl: 'app.html',
  styleUrls:['app.css']
  ,
  providers:[AuthService, BlogService]
})
export class AppComponent //implements OnInit
{ 
  userName: string;


   

    
     constructor(){
        
     }
    
 // ngOnInit():void{alert("hello")}
 
}
