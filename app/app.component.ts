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
  template: ` <div><bubble-panes-right class="column-right"></bubble-panes-right></div>
  <div class="column-center"><router-outlet>
  </router-outlet></div>
<div class="column-left">
 <bubble-panes-left></bubble-panes-left>
 
 </div>
  `,
  styles:['.column-left{ float: left; width: 20%;}.column-right{ float: right; width: 20%; }.column-center{ display: inline-block; width: 60%; }']
})
export class AppComponent //implements OnInit
{ 
 
    
 // ngOnInit():void{alert("hello")}
 
}
