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
var d3 = require("d3");
var BubblesTopBottom = (function () {
    function BubblesTopBottom() {
        this.chartWidth = window.innerWidth;
        this.chartHeight = 100;
        this._data = [];
    }
    BubblesTopBottom.prototype.getRandomArbitary = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    BubblesTopBottom.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    BubblesTopBottom.prototype.ngOnInit = function () {
        var self = this;
        if (this.position == 'top') {
            this.svg = d3.select(".topbubbles").append("svg");
        }
        else {
            this.svg = d3.select(".bottombubbles").append("svg");
        }
        self.svg.attr("height", this.chartHeight)
            .attr("width", this.chartWidth);
        for (var i = 0; i < (window.innerWidth / 10); i = i + 2) {
            self._data.push({
                x: self.getRandomArbitary(i, window.innerWidth),
                y: self.getRandomArbitary(10, 35),
                r: self.getRandomArbitary(15, 30),
            });
        }
        this.renderBubbles();
    };
    BubblesTopBottom.prototype.renderBubbles = function () {
        var self = this;
        self.svg = self.svg.append("g");
        this._data.forEach(function (list, i) {
            self.svg.append("circle")
                .attr('r', list.r)
                .attr("cx", function (d) {
                return list.x;
            })
                .attr("cy", function (d) {
                return list.y;
            })
                .style("fill", function () { return self.getRandomColor(); });
        });
    };
    BubblesTopBottom = __decorate([
        core_1.Component({
            selector: 'top-bottom-bubbles',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], BubblesTopBottom);
    return BubblesTopBottom;
}());
exports.BubblesTopBottom = BubblesTopBottom;
var topBubbles = (function (_super) {
    __extends(topBubbles, _super);
    function topBubbles() {
        _super.call(this);
        this.position = "top";
    }
    topBubbles = __decorate([
        core_1.Component({
            template: "<div style=\"height:100px;top:0px;position:fixed; z-index:5\" class=\"topbubbles\"></div>",
            selector: 'top-bubbles'
        }), 
        __metadata('design:paramtypes', [])
    ], topBubbles);
    return topBubbles;
}(BubblesTopBottom));
exports.topBubbles = topBubbles;
var bottomBubbles = (function (_super) {
    __extends(bottomBubbles, _super);
    function bottomBubbles() {
        _super.call(this);
        this.position = "bottom";
    }
    bottomBubbles = __decorate([
        core_1.Component({
            template: "<div style=\"height:100px;  bottom:0px; position:fixed; z-index:5; transform: rotate(180deg);\" class=\"bottombubbles\"></div>",
            selector: 'bottom-bubbles'
        }), 
        __metadata('design:paramtypes', [])
    ], bottomBubbles);
    return bottomBubbles;
}(BubblesTopBottom));
exports.bottomBubbles = bottomBubbles;
//# sourceMappingURL=BubblesTopBottom.js.map