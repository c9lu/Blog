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
var frequencyMap;
var BlogService = (function () {
    function BlogService(http) {
        this.http = http;
        this.apiURL = environment.webApiURL;
    }
    BlogService.prototype.buildPostObjectFromJson = function (jsonString) {
        return new post_1.Post(Number(jsonString.id), jsonString.title, jsonString.image, jsonString.html, jsonString.createdate);
    };
    BlogService.prototype.buildPostObjectsFromJson = function (jsonArray) {
        var results = [];
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var element = jsonArray_1[_i];
            results.push(new post_1.Post(Number(element.id), element.title, element.image, element.content, element.createdate));
        }
        return results;
    };
    BlogService.prototype.retrieveTagsFrequencyFromPosts = function (jsonArray) {
        frequencyMap = {}; //{};
        var index = 0;
        for (var _i = 0, jsonArray_2 = jsonArray; _i < jsonArray_2.length; _i++) {
            var element = jsonArray_2[_i];
            index = index + 1;
            var obj = {};
            for (var _a = 0, _b = element.tags; _a < _b.length; _a++) {
                var t = _b[_a];
                if (t.indexOf(' ') > 0) {
                    t = t.replace(' ', '_');
                }
                if (frequencyMap[t] == null) {
                    frequencyMap[t] = { count: 1, PostIDs: [] };
                    frequencyMap[t].PostIDs.push(element.id);
                }
                else {
                    frequencyMap[t].count = frequencyMap[t].count + 1;
                    frequencyMap[t].PostIDs.push(element.id);
                }
            }
        }
        return frequencyMap;
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
        if (frequencyMap == null || frequencyMap[tagName] == null) {
            return null;
        }
        else {
            postIDs = frequencyMap[tagName].PostIDs.join("_");
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
            return _this.retrieveTagsFrequencyFromPosts(response.json());
        });
    };
    BlogService.prototype.getAllPosts = function () {
        var _this = this;
        return this.http.get(this.apiURL + '/').map(function (response) {
            return _this.buildPostObjectsFromJson(response.json());
        });
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
//# sourceMappingURL=Blog.service.js.map