"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
require('rxjs/add/operator/map');
var router_1 = require('@angular/router');
var d3 = require("d3");
var d3Result;
var Blog_service_1 = require('./Blog.service'); //import is from ES6.
var D3Bubbles_1 = require('./D3Bubbles');
var CreateBubbles = (function () {
    function CreateBubbles(blogService, router) {
        this.blogService = blogService;
        this.router = router;
        this.Data = { children: [] };
        this.isEven = false;
    }
    CreateBubbles.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    CreateBubbles.prototype.getD3Data = function (val) {
        var data = { children: [] };
        var index = 0;
        for (var element in val) {
            var randomNumberX = Math.random() * 200;
            var randomNumberY = Math.random() * 700;
            var frequency = val[element].count;
            var color = this.getRandomColor();
            if (index % 2 == 0 && this.isEven == true || index % 2 == 1 && this.isEven == false) {
                data.children.push({
                    "frequency": frequency * 2.5,
                    "color": color, "name": "#" + element.toString()
                });
                data.children.push({
                    "frequency": 1,
                    "color": color, "name": ""
                });
            }
            index++;
        }
        return data;
    };
    CreateBubbles.prototype.ngOnInit = function () {
    };
    CreateBubbles.prototype.ngAfterViewInit = function () {
        var _this = this;
        var me = this;
        d3Result = this.blogService.getAllPostsTags_Frequency();
        if (d3Result != null) {
            d3Result.subscribe(function (val) {
                _this.Data = _this.getD3Data(val);
                if (_this.isEven == true)
                    new D3Bubbles_1.D3Bubbles(me.router).SetWidth(800).SetHeight(800).Chart(_this.div.nativeElement, _this.Data, _this.isEven);
                else
                    new D3Bubbles_1.D3Bubbles(me.router).SetWidth(800).SetHeight(800).Chart(_this.div.nativeElement, _this.Data, _this.isEven);
            });
        }
    };
    __decorate([
        core_1.ViewChild('container'), 
        __metadata('design:type', core_1.ElementRef)
    ], CreateBubbles.prototype, "div", void 0);
    CreateBubbles = __decorate([
        core_1.Component({
            providers: [Blog_service_1.BlogService],
            template: "<div #container></div>",
            selector: 'bubble-panes'
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.Router])
    ], CreateBubbles);
    return CreateBubbles;
}());
exports.CreateBubbles = CreateBubbles;
var rightBubbles = (function (_super) {
    __extends(rightBubbles, _super);
    function rightBubbles(blogService2, router2) {
        _super.call(this, blogService2, router2);
        this.blogService2 = blogService2;
        this.router2 = router2;
        this.isEven = false;
    }
    rightBubbles = __decorate([
        core_1.Component({
            providers: [Blog_service_1.BlogService],
            template: "<div #container></div>",
            selector: 'bubble-panes-right',
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.Router])
    ], rightBubbles);
    return rightBubbles;
}(CreateBubbles));
exports.rightBubbles = rightBubbles;
var leftBubbles = (function (_super) {
    __extends(leftBubbles, _super);
    function leftBubbles(blogService3, router3) {
        _super.call(this, blogService3, router3);
        this.blogService3 = blogService3;
        this.router3 = router3;
        this.isEven = true;
    }
    leftBubbles = __decorate([
        core_1.Component({
            providers: [Blog_service_1.BlogService],
            template: "<div #container></div>",
            selector: 'bubble-panes-left'
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService, router_1.Router])
    ], leftBubbles);
    return leftBubbles;
}(CreateBubbles));
exports.leftBubbles = leftBubbles;
//# sourceMappingURL=CreateBubbles.js.map