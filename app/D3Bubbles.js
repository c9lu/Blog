"use strict";
var d3 = require("d3");
var node;
var D3Bubbles = (function () {
    //  node;
    // gradientDictionary={};
    function D3Bubbles(router) {
        this.router = router;
    }
    D3Bubbles.prototype.isDarkColor = function (colorCode) {
        // remove hash character from string
        var rawColor = colorCode.substring(1, colorCode.length);
        // convert hex string to int
        var rgb = Number.parseInt(rawColor, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >> 8) & 0xff;
        var b = (rgb >> 0) & 0xff;
        var result = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (result < 100) {
            return false;
        }
        else {
            return true;
        }
    };
    D3Bubbles.prototype.gradientTheColor = function (colorcode, freq) {
        var gradientColor = this.SVGContainer.append("defs")
            .append("radialGradient")
            .attr("id", "radial-gradient" + colorcode);
        var centerColor = "black";
        if (this.isDarkColor(colorcode) == false) {
            centerColor = colorcode;
        }
        gradientColor.append("stop")
            .attr("offset", "60%")
            .attr("stop-color", centerColor);
        // .style("opacity", 0.5);
        gradientColor.append("stop")
            .attr("offset", "80%")
            .attr("stop-color", colorcode);
    };
    D3Bubbles.prototype.decorateCommentBubbles = function () {
        var commentgroup = d3.selectAll(".comment").append("g");
        commentgroup.append("svg:image")
            .attr("width", function (d) {
            return d.r * 2;
        })
            .attr("height", function (d) { return d.r * 1.5; })
            .attr("xlink:href", "Images/purplecomment.png")
            .attr("x", function (d) {
            return -(d.r);
        }).attr("y", function () {
            return -25;
        })
            .style("opacity", function (d) { return 0.65; })
            .style("cursor", "pointer");
        commentgroup.append("text").text(function (d) {
            if (d.data.rfreq > 2)
                return d.data.rfreq;
            else
                return "";
        }).attr("font-size", function (d) { return d.data.rfreq * 5; })
            .attr("y", function (d) { return -22; })
            .style("cursor", "pointer");
    };
    D3Bubbles.prototype.Chart = function (div, dataset, isEven) {
        var bubble = d3.pack(dataset).size([this.Width, this.Height]).padding(100);
        this.SVGContainer = d3.select(div).append('svg')
            .attr('width', this.Width)
            .attr('height', this.Height)
            .attr("class", "bubble");
        //https://jsfiddle.net/r24e8xd7/9/
        //to append a circle to each data.
        ///to append image https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js
        var nodes = d3.hierarchy(dataset).sum(function (d) { return d.frequency; });
        var _class = "";
        node = this.SVGContainer.selectAll("node").data(bubble(nodes).descendants())
            .enter()
            .filter(function (d) {
            return !d.children;
        })
            .append('g').attr("class", function (d) {
            if (isEven == false) {
                _class = "nodeO";
            }
            else {
                _class = "nodeE";
            }
            if (d.data.IsComment == 0) {
                return _class + " circle";
            }
            else {
                return _class + " circle comment";
            }
        });
        var me = this;
        var circle = d3.selectAll("." + _class + ".circle").append("circle")
            .attr("r", function (d) {
            return d.r * 1.2;
        })
            .style("fill", function (d) {
            me.gradientTheColor(d.data.color, d.data.rfreq);
            return "url(#radial-gradient" + d.data.color + ")";
        });
        this.decorateCommentBubbles();
        var self = this;
        var text = d3.selectAll(".circle").append("text")
            .attr("text-anchor", "middle")
            .attr("id", function (d) {
            var id = d.data.name.replace(" ", "_");
            return id.substring(1);
        })
            .attr("class", function (d) {
            if (d.data.IsComment == 1)
                return "c_bubbletext";
            else
                return "bubbletext";
        })
            .style("cursor", "pointer")
            .text(function (d) {
            if (d.data.IsComment == 1) {
                if (d.data.rfreq > 2) {
                    return d.data.name.substring(1, 12) + "...";
                }
                else {
                    return d.data.rfreq;
                }
            }
            else
                return d.data.name.replace("_", " ");
        })
            .attr("font-size", function (d) {
            if (d.data.IsComment == 1) {
                return "20px";
            }
            return d.r / 2.3 + "px";
        })
            .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
            .style("fill", function (d) {
            if (self.isDarkColor(d.data.color) == false) {
                return "black";
            }
            return d.data.color;
        });
        /*  .style("fill", function(d) {
                    me.gradientTheColor(d.data.color, d.data.rfreq)
                    return "url(#radial-gradient"+d.data.color+")"; })*/
        d3.selectAll(".bubbletext").on("mousedown", function (d) {
            var tag = d.data.name.substring(1);
            me.router.navigate(['/Tags', tag]);
        });
        d3.selectAll(".comment").on("mousedown", function (d) {
            var title = d.data.name;
            // alert(d.data.postid);
            me.router.navigate(['/Posts', d.data.postid]);
        });
        d3.selectAll("g.nodeE").transition().duration(1500)
            .attr("transform", function (d) {
            if (typeof d != 'undefined') {
                if (d.y < (400))
                    return "translate(" + (d.x - 80) + "," + (d.y - 135) + ")";
                else
                    return "translate(" + (d.x - 80) + "," + (d.y - 60) + ")";
            }
        });
        d3.selectAll("g.nodeO").transition().duration(1500)
            .attr("transform", function (d) {
            if (typeof d != 'undefined')
                if (d.y < (400))
                    return "translate(" + (d.x - 30) + "," + (d.y - 135) + ")";
                else
                    return "translate(" + (d.x - 30) + "," + (d.y - 60) + ")";
        });
    };
    D3Bubbles.prototype.SetWidth = function (value) {
        this.Width = value;
        return this;
    };
    D3Bubbles.prototype.SetHeight = function (value) {
        this.Height = value;
        return this;
    };
    return D3Bubbles;
}());
exports.D3Bubbles = D3Bubbles;
//# sourceMappingURL=D3Bubbles.js.map