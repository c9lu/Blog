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
var post_1 = require("./post");
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var comment_1 = require("./comment");
var app_functions_1 = require("./app.functions");
var BlogService = (function () {
    function BlogService(http) {
        this.http = http;
        this.apiURL = environment.webApiURL;
        this.frequencyMap = {};
    }
    BlogService.prototype.buildPostObjectFromJson = function (jsonString) {
        var post = new post_1.Post(Number(jsonString.id), jsonString.title, jsonString.image, jsonString.html, jsonString.createdate);
        post.comments = jsonString.postcomments;
        return post;
    };
    BlogService.prototype.buildPostObjectsFromJson = function (jsonArray) {
        var results = [];
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var element = jsonArray_1[_i];
            results.push(new post_1.Post(Number(element.id), element.title, element.image, element.content, element.createdate));
        }
        return results;
    };
    /* private retrievePostComments(jsonArray:any):any{
         let frequencyMap = {};
        
             
          //  if(element.postcomments.length!=null && element.postcomments.length>0){
        frequencyMap = jsonArray.map((element)=>{
                 return   getFreqObj(frequencyMap, element, "title", element.postcomments!=null? element.postcomments.length:0);
                     

                });
       
         

     }*/
    BlogService.prototype.savePostComments = function (comment) {
        var result = this.http.post(this.apiURL + '/savecomment', comment);
        return result;
    };
    BlogService.prototype.retrieveTagsFrequencyFromPosts = function (jsonArray) {
        var index = 0;
        var self = this;
        if (JSON.stringify(self.frequencyMap) == '{}') {
            //      this.frequencyMap={};
            jsonArray.forEach(function (post) {
                post.tags.forEach(function (tag) {
                    tag = tag.replace(' ', '_');
                    self.frequencyMap = app_functions_1.getFreqObj(self.frequencyMap, post, tag, 1, 0);
                });
                if (typeof (post.postcomments) != 'undefined' && post.postcomments != null) {
                    post.postcomments.forEach(function (comment) {
                        self.frequencyMap = app_functions_1.getFreqObj(self.frequencyMap, post, post.title, 1, 1);
                    });
                }
            });
        }
        return self.frequencyMap;
    };
    BlogService.prototype.getPostById = function (id) {
        var _this = this;
        return this.http.get(this.apiURL + '/Posts/' + id).map(function (response) {
            return _this.buildPostObjectFromJson(response.json());
        });
    };
    BlogService.prototype.GetPostsFromTagName = function (tagName) {
        var _this = this;
        var postIDs = [];
        if (this.frequencyMap == null || this.frequencyMap[tagName] == null) {
            return null;
        }
        else {
            postIDs = this.frequencyMap[tagName].PostIDs.join("_");
        }
        return this.http.get(this.apiURL + '/MPosts/' + postIDs).map(function (response) {
            return _this.buildPostObjectsFromJson(response.json());
        });
    };
    BlogService.prototype.getPostsByCategory = function (category) {
        var _this = this;
        return this.http.get(this.apiURL + '/Category/' + category).map(function (response) {
            return _this.buildPostObjectsFromJson(response.json());
        });
    };
    BlogService.prototype.getAllPostsTags_Frequency = function () {
        var _this = this;
        return this.http.get(this.apiURL + '/').map(function (response) {
            _this.frequencyMap = _this.retrieveTagsFrequencyFromPosts(response.json());
            return _this.frequencyMap;
        });
    };
    BlogService.prototype.getAllPosts = function () {
        var _this = this;
        return this.http.get(this.apiURL + '/').map(function (response) {
            return _this.buildPostObjectsFromJson(response.json());
        });
    };
    BlogService.prototype.getPostComments = function (postID) {
        var _this = this;
        return this.http.get(this.apiURL + '/Comments/' + postID).map(function (response) {
            return _this.buildCommentObjects(response.json());
        });
    };
    BlogService.prototype.buildCommentObjects = function (jsonObject) {
        var comments = new Array();
        for (var _i = 0, _a = jsonObject[0].postcomments; _i < _a.length; _i++) {
            var pc = _a[_i];
            if (pc.author == null || pc.author == "") {
                pc.author = "Anonymous";
            }
            var c = new comment_1.comment(Number(pc.postid), pc.content, pc.author, pc.id);
            comments.push(c);
        }
        return comments;
    };
    BlogService.prototype.deleteComment = function (_postid, _commentid) {
        var comment = { postid: _postid, commentid: _commentid };
        return this.http.post(this.apiURL + '/deletecomment', comment);
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
//# sourceMappingURL=Blog.service.js.map