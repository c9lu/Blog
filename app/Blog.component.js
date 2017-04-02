"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Blog_service_1 = require('./Blog.service');
var blog_datasource_1 = require('./blog.datasource');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var CreateBubbles_1 = require('./CreateBubbles');
//import { routing } from './AppRoutes';
//import {Router, Params} from '@angular/router'
var Blog = (function () {
    function Blog() {
    }
    return Blog;
}());
exports.Blog = Blog;
var BlogComponent = (function () {
    function BlogComponent(router, blogService, http, bubbleCreator) {
        this.router = router;
        this.blogService = blogService;
        this.http = http;
        this.bubbleCreator = bubbleCreator;
        this.name = 'guest';
        this.title = 'this is my blog';
        this.blog = {
            subtitle: 'what am i up to?',
            tags: ["post1", "post2"],
            Posts: [] // [{id: 1, title:"abc", content:"dfa", category:"Art"}, 
        };
        // this.route = Router;
        //  this.
    }
    BlogComponent.prototype.ngOnInit = function () {
        var me = this;
        var category = "";
        // $("")
        //this function can access variables declared in the constructor like route.
        //  me.
        // alert(BlogPosts);
        //me.bubbleCreator.getSeriesData();
        me.router.params.subscribe(function (params) {
            category = params["category"];
            if (category != null && category != "") {
                // alert(category);
                me.blog.Posts = me.blogService.getPostsByCategory(blog_datasource_1.BlogPosts, category);
            }
            else {
                me.blogService.getAllPosts().subscribe(function (val) { me.blog.Posts = val; });
                ;
            }
        });
    };
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'blogs-list',
            ////<li *ngFor =" let post of Posts"><span>{{post.title}}</span>
            ///<post-detail [post]="post"></post-detail>   
            ///</li>
            moduleId: module.id,
            templateUrl: 'blog.html',
            styleUrls: ['blog.css'],
            providers: [Blog_service_1.BlogService, CreateBubbles_1.CreateBubbles] // the injector relies on providers to create instances of the services
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, Blog_service_1.BlogService, http_1.Http, CreateBubbles_1.CreateBubbles])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=Blog.component.js.map