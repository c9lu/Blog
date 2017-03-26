"use strict";
var router_1 = require('@angular/router');
var post_detail_1 = require('./post-detail');
var Blog_component_1 = require('./Blog.component');
exports.BlogAppRoutes = [
    //  {path:'', component:BlogComponent},
    { path: 'Posts/:id', component: post_detail_1.PostDetailComponent },
    { path: ':category', component: Blog_component_1.BlogComponent },
    { path: '', component: Blog_component_1.BlogComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.BlogAppRoutes); //
//# sourceMappingURL=AppRoutes.js.map