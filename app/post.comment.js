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
var router_1 = require('@angular/router');
require('rxjs/add/operator/mergeMap');
var comment_1 = require('./comment');
var PostCommentComponent = (function () {
    //  @Output() commentsCount = new EventEmitter();
    function PostCommentComponent(blogService, route) {
        this.blogService = blogService;
        this.route = route;
    }
    PostCommentComponent.prototype.SaveComment = function (value) {
        var postid = 0;
        var me = this;
        this.route.params.subscribe(function (params) {
            postid = params['id'];
        });
        var user = localStorage.getItem("chenplayground");
        var _comment = new comment_1.comment(postid, value.commentInput, user, this.comments.length);
        this.blogService.savePostComments(_comment).subscribe(function (result) {
            me.blogService.getPostComments(postid).subscribe(function (response) {
                me.comments = response;
            });
        });
    };
    PostCommentComponent.prototype.deleteComment = function (postid, commetid) {
        var me = this;
        this.blogService.deleteComment(postid, commetid).subscribe(function () {
            me.blogService.getPostComments(postid).subscribe(function (response) {
                me.comments = response;
            });
        });
    };
    PostCommentComponent.prototype.ngOnInit = function () {
        $("#loader").hide();
        var id = 0;
        var me = this;
        this.route.params.subscribe(function (params) {
            id = params['id'];
        });
        //me.blogService.getPostComments(id).subscribe(response=>{
        // this.comments = response;
        //   this.commentsCount.emit(this.comments.length);
        // }
        //  )
    };
    PostCommentComponent.prototype.ngOnChanges = function (changes) {
        //var commments = changes.currentValue;
        if (typeof changes.comments.currentValue == "undefined") {
            this.comments = [];
        }
        else {
            this.comments = changes.comments.currentValue;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PostCommentComponent.prototype, "comments", void 0);
    PostCommentComponent = __decorate([
        core_1.Component({
            selector: 'comments-area',
            templateUrl: './app/post.comments.html'
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.ActivatedRoute])
    ], PostCommentComponent);
    return PostCommentComponent;
}());
exports.PostCommentComponent = PostCommentComponent;
//# sourceMappingURL=post.comment.js.map