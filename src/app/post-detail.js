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
var post_1 = require('./post');
var Blog_service_1 = require('./Blog.service');
require('rxjs/add/operator/map');
var router_1 = require('@angular/router');
//import {Injectable} from 'angular'
var PostDetailComponent = (function () {
    function PostDetailComponent(blogService, route) {
        this.blogService = blogService;
        this.route = route;
        this.visibility = 'hidden';
    }
    //  ( blogService.getPostById(id).subscribe
    //              .subscribe(post=>me.post = post
    //   );
    //      this.route.params.switchMap((params: Params) => 
    //   blogService.getPostById(+params['id'])).subscribe((post:Post)=>this.post = post)
    PostDetailComponent.prototype.ngOnInit = function () {
        var me = this;
        //  me.route.params.subscribe(params => {
        var id = 0;
        //the params is from ActivatedRoute
        var posts;
        // posts = new Blog().Posts;
        // posts = BlogPosts
        me.route.params.subscribe(function (params) {
            id = params['id'];
            if (id == null) {
            }
            else {
                me.blogService.getPostById(id).subscribe(function (p) {
                    me.post = p;
                });
            }
        });
        setTimeout(function () {
            me.visibility = 'shown';
        }, 500);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.Post)
    ], PostDetailComponent.prototype, "post", void 0);
    PostDetailComponent = __decorate([
        core_1.Component({
            selector: 'post-detail',
            animations: [
                core_1.trigger('showPosts', [
                    core_1.state('shown', core_1.style({ opacity: 1 })),
                    core_1.state('hidden', core_1.style({ opacity: 0 })),
                    core_1.transition('shown => hidden', core_1.animate('1000ms')),
                    core_1.transition('hidden => shown', core_1.animate('1000ms'))
                ])
            ],
            template: "<div [@showPosts]=\"visibility\">,\n\n            <h2>{{post?.title}}</h2>\n            <br/>\n            <h1>{{post?.content}}</h1>\n            </div>\n\n            ",
            providers: [Blog_service_1.BlogService]
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.ActivatedRoute])
    ], PostDetailComponent);
    return PostDetailComponent;
}());
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail.js.map