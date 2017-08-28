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
    PostDetailComponent.prototype.onNotify = function (message) {
        //alert(message);
        this.commentsCount = message;
    };
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
                    me.comments = p.comments;
                });
            }
        });
    };
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
             ],
              <comments-area (commentsCount)="onNotify($event)"></comments-area>*/
            template: "<div class=\"app post\">\n    \n    <p style=\"font-size:22px; color:white;font-family:Calibri\">{{post?.title}}</p>\n    <div>\n    <p style=\"float:left ;font-size:18px; color:white; font-family:Calibri\" *ngIf=\"post?.createdate!=''\">Written on {{post?.createdate}}</p>\n    <span style=\"color:aqua; float:right\" *ngIf=\"comments?.length>0\">{{comments?.length}} comments</span>\n    <a simplePageScroll href=\"#commentssection\" style=\"display:none\"></a>\n    </div>\n    \n    <div [innerHtml]=\"myTemplate\" style=\"color:white;font-family:Calibri; font-size:17px; width:100%; clear:both\"></div></div>\n    <div id=\"commentssection\">\n       <comments-area [comments]=\"comments\"></comments-area>\n    </div>\n    ",
            styles: [
                "\n          \n   @media screen and (min-width: 801px) {\n\n\n\n   .post\n                {\n                        \n                        width:100%;\n                        margin-right:0;\n                        margin-left:0;\n                        \n                }\n}\n\n    "
            ]
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.ActivatedRoute])
    ], PostDetailComponent);
    return PostDetailComponent;
}());
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail.js.map