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
        this.myTemplate = '';
    }
    PostDetailComponent.prototype.ngOnInit = function () {
        var me = this;
        var id = 0;
        var posts;
        me.route.params.subscribe(function (params) {
            id = params['id'];
            $.get('./_posts/post' + id + '.html', function (html_string) {
                me.myTemplate = html_string;
            });
            if (id != null) {
                $("#loader").hide();
                me.blogService.getPostById(id).subscribe(function (p) {
                    me.post = p;
                });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.Post)
    ], PostDetailComponent.prototype, "post", void 0);
    PostDetailComponent = __decorate([
        core_1.Component({
            selector: 'post-detail',
            /* animations:[
             trigger('showPosts', [
                 state('shown', style({opacity: 1})),
                 state('hidden', style({opacity: 0})),
                 transition('shown => hidden', animate('1000ms')),
                 transition('hidden => shown', animate('1000ms'))
             ])
             ],*/
            template: "<div class=\"column-center post\">\n    <p style=\"font-size:22px; color:white;font-family:Calibri\">{{post?.title}}</p>\n    <p style=\"font-size:18px; color:white; font-family:Calibri\">Written on {{post?.createdate}}</p>\n    <div [innerHtml]=\"myTemplate\" style=\"color:white;font-family:Calibri; font-size:17px\"></div></div>",
            styles: [
                "\n            @media screen and (min-width: 0px) and (max-width: 600px) {\n                .post\n                {\n                        margin-left:-70px;\n                       \n                        padding-left:0px;\n                        width:200%;\n                        \n                        \n                }\n\n                .entry-content img{\n                        width:50%\n                }\n             \n        }\n   \n         @media screen and (min-width: 601px) {\n        .post\n        { \n    \n        z-index:0; \n        opacity:1;\n       \n        background-color:black;\n       \n        padding-left:6px;\n        padding-right:6px\n        max-width:50%;\n\n        }\n        }\n\n    \n\n\n\n    "
            ],
            providers: [Blog_service_1.BlogService]
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.ActivatedRoute])
    ], PostDetailComponent);
    return PostDetailComponent;
}());
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail.js.map