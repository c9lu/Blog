import {Routes, RouterModule} from '@angular/router';
import {PostDetailComponent} from './post-detail';
import {BlogComponent} from './Blog.component';
import {CreateBubbles} from './CreateBubbles';
import {LoginComponent} from './Login.Component';
import {PostCommentComponent} from './post.comment';
export const BlogAppRoutes: Routes =[
  
    {path:'Posts/:id', component:PostDetailComponent},
    {path:'Category/:id', component:BlogComponent},
    {path:'', component:BlogComponent},
    {path:'Tags/:id', component:BlogComponent},
    {path:'Login', component:LoginComponent},
    {path:'Logout', component:LoginComponent},
    {path:'Comment/:id', component:PostCommentComponent}

];

export const routing = RouterModule.forRoot(BlogAppRoutes);