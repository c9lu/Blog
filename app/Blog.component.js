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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var CreateBubbles_1 = require('./CreateBubbles');
var $ = require("jquery");
var Blog = (function () {
    function Blog() {
    }
    return Blog;
}());
exports.Blog = Blog;
var BlogComponent = (function () {
    function BlogComponent(activatedRoute, router, blogService, http, bubbleCreator) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.blogService = blogService;
        this.http = http;
        this.bubbleCreator = bubbleCreator;
        this.name = 'guest';
        this.title = 'this is my blog';
        this.selectedTag = "";
        this.blog = {
            subtitle: "Hello guest, what am I up to?",
            Posts: []
        };
    }
    BlogComponent.prototype.ngAfterViewInit = function () {
        var me = this;
        setTimeout(function () {
            $(".bubbles").click(function (e) {
                var tag = $(this).attr('id');
                me.selectedTag = tag;
                me.router.navigate(['/Tags', tag]);
            });
        }, 800);
    };
    BlogComponent.prototype.ngOnInit = function () {
        var me = this;
        var id = "";
        me.activatedRoute.params.subscribe(function (params) {
            id = params["id"];
            $(".column-left").css("z-index", 0);
            $(".column-right").css("z-index", 0);
            if (me.router.url.indexOf('Tags') > 0) {
                var result = me.blogService.GetPostsFromTagName(id);
                me.selectedTag = id;
                $("#tagDiv").show();
                if (typeof result != 'undefined' && result != null) {
                    result.subscribe(function (val) {
                        me.blog.Posts = val;
                    });
                }
                else {
                    me.router.navigate(['']);
                }
            }
            else if (id != null && id != "") {
                me.blogService.getPostsByCategory(id).subscribe(function (val) { me.blog.Posts = val; });
            }
            else {
                me.blogService.getAllPosts().subscribe(function (val) {
                    me.blog.Posts = val;
                });
            }
        });
    };
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'blogs-list',
            moduleId: module.id,
            templateUrl: 'blog.html',
            styleUrls: ['blog.css'],
            providers: [Blog_service_1.BlogService, CreateBubbles_1.CreateBubbles] // the injector relies on providers to create instances of the services
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, Blog_service_1.BlogService, http_1.Http, CreateBubbles_1.CreateBubbles])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=Blog.component.js.map