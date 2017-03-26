import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router"
import { AppComponent }  from './app.component';
import { PostDetailComponent } from './post-detail';
import { routing } from './AppRoutes';
import {BlogComponent} from "./Blog.component";
import { HttpModule, JsonpModule } from '@angular/http';
import {rightBubbles} from "./CreateBubbles";
import {leftBubbles} from "./CreateBubbles";
import {BlogService} from './Blog.service';
@NgModule({
  imports:      [ BrowserModule ,   HttpModule,
 //
 routing
  ],
  declarations: [ 
      AppComponent,
      BlogComponent,
      PostDetailComponent ,
    
       rightBubbles,
       leftBubbles
      
    //  BlogAppRoutes
    ],
    providers:[
      BlogService
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
