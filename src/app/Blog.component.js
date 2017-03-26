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
            template: "\n  \n  <h3 [innerText]=\"name\"></h3>\n  <h1 align=\"center\">Hello {{name}} {{blog.subtitle}}</h1>\n  <div align=\"center\">\n<ul>\n    <li>\n  <a [routerLink]=\"['', 'Programming']\">   \n  <svg viewBox='0 0 105 105' height=\"150\" width=\"300\" style=\"display:block, margin:auto\">\n   <g>\n  <path d='M 0,60 \n           a 20,20 1 0,0 0,40 \n           h 50 \n           a 20,20 1 0,0 0,-40 \n           a 10,10 1 0,0 -15,-10 \n           a 15,15 1 0,0 -35,10  \n           z' fill=\"#33CAFF\"/>\n  <path d='M 45,50 \n           a 20,20 1 0,0 0,40 \n           h 50 \n           a 20,20 1 0,0 0,-40 \n           a 10,10 1 0,0 -15,-10 \n           a 15,15 1 0,0 -35,10  \n           z' fill=\"#33CAFF\"/>\n            <text fill=\"white\" text-anchor=\"middle\" y=\"75\" x=\"40\">Programming</text>\n    </g>\n    </svg>\n  </a>  \n  </li>   \n  <li>\n  \n     <a [routerLink]=\"['','Art']\" >\n    \n    <svg viewBox='150 0 105 105' height=\"150\" width=\"300\">\n   \n     <path d='M 150,60 \n           a 20,20 1 0,0 0,40 \n           h 50 \n           a 20,20 1 0,0 0,-40 \n           a 10,10 1 0,0 -15,-10 \n           a 15,15 1 0,0 -35,10  \n           z' fill=\"#33CAFF\"/>\n     <text fill=\"white\" text-anchor=\"middle\" y=\"75\" x=\"166\">Art work</text>\n    </svg>\n    </a>\n    </li>\n\n    \n    <li>Recent posts</li>\n    <li>\n  </ul>\n  </div>\n\n  <div  *ngFor=\"let post of blog.Posts\" class=\"posts\">\n  <div align=\"center\">\n      <a [routerLink]=\"['/Posts', post.id]\">\n      {{post.title}}\n      </a>\n   <br/>\n      <img src=\"Images/{{post.image}}.jpg\" width=\"250\" />\n  <br/>\n  </div>\n\n  </div>\n    \n  ",
            styles: ['ul {list-style-type:none} li {float:left} .posts {clear:both}'],
            providers: [Blog_service_1.BlogService, CreateBubbles_1.CreateBubbles] // the injector relies on providers to create instances of the services
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, Blog_service_1.BlogService, http_1.Http, CreateBubbles_1.CreateBubbles])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=Blog.component.js.map