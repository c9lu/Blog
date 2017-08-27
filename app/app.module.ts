import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router"
import { AppComponent }  from './app.component';
import { PostDetailComponent } from './post-detail';
import { routing } from './AppRoutes';
import {BlogComponent} from "./Blog.component";
import {LoginComponent} from "./Login.Component";
import { HttpModule, JsonpModule } from '@angular/http';
import {rightBubbles} from "./CreateBubbles";
import {leftBubbles} from "./CreateBubbles";
import {BlogService} from './Blog.service';
import {AuthService} from './AuthenticationService';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import {AppHeader} from './app.header'
import {PostCommentComponent}from './post.comment'

var $ = require("jquery");
@NgModule({
  imports:      [ BrowserModule ,   HttpModule,FormsModule,
    ReactiveFormsModule, 
 //
 routing
  ],
  declarations: [ 
     AppHeader,
      AppComponent,
      BlogComponent,
      PostDetailComponent ,
    
       rightBubbles,
       leftBubbles,
       LoginComponent,
       
       PostCommentComponent
     
    //  BlogAppRoutes
    ],
    providers:[
     
      AuthService
    ],
  bootstrap:    [ AppComponent]
})
export class AppModule { 

}
