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
//require('rxjs');
require('rxjs/add/operator/map');
var BlogService = (function () {
    function BlogService(http) {
        // this.results = <Beh
        this.http = http;
    }
    BlogService.prototype.buildPostObjectFromJson = function (jsonString) {
        //    alert(jsonString.title);
        return new post_1.Post(Number(jsonString.id), jsonString.title, jsonString.image);
    };
    BlogService.prototype.buildPostObjectsFromJson = function (jsonArray) {
        var results = [];
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var element = jsonArray_1[_i];
            //   alert(element.image);
            results.push(new post_1.Post(Number(element.id), element.title, element.image));
        }
        return results;
    };
    BlogService.prototype.retrieveTagsFrequencyFromPosts = function (jsonArray) {
        var frequencyMap = {}; //{};
        var index = 0;
        for (var _i = 0, jsonArray_2 = jsonArray; _i < jsonArray_2.length; _i++) {
            var element = jsonArray_2[_i];
            //  alert(element.title);
            index = index + 1;
            var obj = {};
            for (var _a = 0, _b = element.tags; _a < _b.length; _a++) {
                var t = _b[_a];
                if (frequencyMap[t] == null)
                    frequencyMap[t] = 1;
                else
                    frequencyMap[t] = frequencyMap[t] + 1;
            }
        }
        return frequencyMap;
    };
    BlogService.prototype.getPostById = function (id) {
        var _this = this;
        //return  posts.find(x=> x.id==id);
        return this.http.get('http://localhost:5000/Posts/' + id).map(function (response) {
            //  alert(response.json());
            return _this.buildPostObjectFromJson(response.json());
        });
        // return app('')
    };
    BlogService.prototype.getPostsByCategory = function (posts, category) {
        return posts.filter(function (p) { return p.category == category; });
    };
    BlogService.prototype.getAllPostsTags_Frequency = function () {
        var _this = this;
        return this.http.get('http://localhost:5000/').map(function (response) {
            return _this.retrieveTagsFrequencyFromPosts(response.json());
        });
    };
    BlogService.prototype.getAllPosts = function () {
        var _this = this;
        return this.http.get('http://localhost:5000/').map(function (response) {
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