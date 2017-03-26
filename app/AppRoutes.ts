import {Routes, RouterModule} from '@angular/router';
import {PostDetailComponent} from './post-detail';
import {BlogComponent} from './Blog.component';
import {CreateBubbles} from './CreateBubbles'

export const BlogAppRoutes: Routes =[
  //  {path:'', component:BlogComponent},
    {path:'Posts/:id', component:PostDetailComponent},
    {path:':category', component:BlogComponent},
    {path:'', component:BlogComponent}

];

export const routing = RouterModule.forRoot(BlogAppRoutes);//