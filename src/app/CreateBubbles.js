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
///<reference path="../node_modules/d3/build/d3.js"/>
var Highcharts = require('highcharts');
require('highcharts-more')(Highcharts);
var d3 = require("d3");
var Blog_service_1 = require('./Blog.service'); //import is from ES6.
var D3Bubbles_1 = require('./D3Bubbles');
var CreateBubbles = (function () {
    function CreateBubbles(blogService) {
        this.blogService = blogService;
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
            var frequency = val[element];
            var color = this.getRandomColor();
            if (index % 2 == 0 && this.isEven == true || index % 2 == 1 && this.isEven == false) {
                data.children.push({
                    "cx": randomNumberX + 50, "cy": randomNumberY, "radius": frequency * 50,
                    "color": color, "name": element.toString()
                });
            }
            index++;
        }
        return data;
    };
    CreateBubbles.prototype.getSeriesData = function (val) {
        var data = [];
        for (var element in val) {
            // series = {}
            var randomNumberX = Math.random() * 200;
            var randomNumberY = Math.random() * 700;
            var frequency = val[element];
            // alert(element);
            data.push({
                x: randomNumberX, y: randomNumberY, z: frequency * 25,
                name: element.toString(),
            });
        }
        return data;
    };
    CreateBubbles.prototype.generateHighChart = function (seriesData) {
        var chart = Highcharts.chart('container', {
            chart: {
                type: 'bubble',
                plotBorderWidth: 0,
                zoomType: 'xy'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                    data: seriesData
                }],
        });
        chart.xAxis[0].update({ visible: false });
        chart.yAxis[0].update({ visible: false });
    };
    CreateBubbles.prototype.ngOnInit = function () {
    };
    CreateBubbles.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.blogService.getAllPostsTags_Frequency().subscribe(function (val) {
            _this.Data = _this.getD3Data(val);
            new D3Bubbles_1.D3Bubbles().SetWidth(500).SetHeight(800).Chart(_this.div.nativeElement, _this.Data);
        });
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
        __metadata('design:paramtypes', [Blog_service_1.BlogService])
    ], CreateBubbles);
    return CreateBubbles;
}());
exports.CreateBubbles = CreateBubbles;
var rightBubbles = (function (_super) {
    __extends(rightBubbles, _super);
    function rightBubbles(blogService2) {
        _super.call(this, blogService2);
        this.blogService2 = blogService2;
        this.isEven = false;
    }
    rightBubbles = __decorate([
        core_1.Component({
            providers: [Blog_service_1.BlogService],
            template: "<div #container></div>",
            selector: 'bubble-panes-right',
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService])
    ], rightBubbles);
    return rightBubbles;
}(CreateBubbles));
exports.rightBubbles = rightBubbles;
var leftBubbles = (function (_super) {
    __extends(leftBubbles, _super);
    function leftBubbles(blogService3) {
        _super.call(this, blogService3);
        this.blogService3 = blogService3;
        this.isEven = true;
    }
    leftBubbles = __decorate([
        core_1.Component({
            providers: [Blog_service_1.BlogService],
            template: "<div #container></div>",
            selector: 'bubble-panes-left'
        }), 
        __metadata('design:paramtypes', [Blog_service_1.BlogService])
    ], leftBubbles);
    return leftBubbles;
}(CreateBubbles));
exports.leftBubbles = leftBubbles;
//# sourceMappingURL=CreateBubbles.js.map