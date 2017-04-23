import {Routes, RouterModule} from '@angular/router';
import {PostDetailComponent} from './post-detail';
import {BlogComponent} from './Blog.component';
import {CreateBubbles} from './CreateBubbles'

export const BlogAppRoutes: Routes =[
  
    {path:'Posts/:id', component:PostDetailComponent},
    {path:'Category/:id', component:BlogComponent},
    {path:'', component:BlogComponent},
    {path:'Tags/:id', component:BlogComponent}

];

export const routing = RouterModule.forRoot(BlogAppRoutes);