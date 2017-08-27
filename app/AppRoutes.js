"use strict";
var router_1 = require('@angular/router');
var post_detail_1 = require('./post-detail');
var Blog_component_1 = require('./Blog.component');
var Login_Component_1 = require('./Login.Component');
var post_comment_1 = require('./post.comment');
exports.BlogAppRoutes = [
    { path: 'Posts/:id', component: post_detail_1.PostDetailComponent },
    { path: 'Category/:id', component: Blog_component_1.BlogComponent },
    { path: '', component: Blog_component_1.BlogComponent },
    { path: 'Tags/:id', component: Blog_component_1.BlogComponent },
    { path: 'Login', component: Login_Component_1.LoginComponent },
    { path: 'Logout', component: Login_Component_1.LoginComponent },
    { path: 'Comment/:id', component: post_comment_1.PostCommentComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.BlogAppRoutes);
//# sourceMappingURL=AppRoutes.js.map