//var mongoose = require("./mango.api.js")
import { Component , ViewChild} from '@angular/core';

import {rightBubbles} from './CreateBubbles';
import {leftBubbles} from './CreateBubbles';
//https://github.com/angular/angular/issues/10646
@Component({
  selector: 'my-app-2',
  ////<li *ngFor =" let post of Posts"><span>{{post.title}}</span>
   ///<post-detail [post]="post"></post-detail>   
  ///</li>
  moduleId: module.id,
  templateUrl: 'app.html',
  styleUrls:['app.css']
})
export class AppComponent //implements OnInit
{ 
 
    
 // ngOnInit():void{alert("hello")}
 
}
