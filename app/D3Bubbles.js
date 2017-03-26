"use strict";
var d3 = require("d3");
var D3Bubbles = (function () {
    function D3Bubbles() {
    }
    D3Bubbles.prototype.forceSimulation = function (data) {
        /* var node = this.SVGContainer.selectAll("node")
          var force = d3.forceSimulation(this.node).force("charge", d3.forceManyBody().strengh(3))
         
          .force("link", d3.forceLink().distance(function(d) {return 100;}))
          .on("tick", function() {
  
            node.attr("cx", function(d) { return d.cx + 6; })
                 .attr("cy", function(d) { return d.cy + 4; });
          });*/
        /* let container = this.SVGContainer;
         d3.forceSimulation(data).force("xAxis", d3.forceX(this.Width/2))
                                 .force("yAxis", d3.forceY(this.Height/2))
                                 .force('charge', d3.forceManyBody().strength(3))
                                 .on("tick", function(){
                                         this.node.each.
                                         
                                         attr(
                                             "transform", function(d) { return 'translate(' + [d.x, d.y] + ')'; })
                                             
                                             //"cx", function(d){return d.x;})
                                                                            //  .attr("cy", function(d){return d.y});
                                           
                                 });*/
        d3.selectAll("circle").transition().style("opacity", 1).duration(1700);
    };
    D3Bubbles.prototype.Chart = function (selection, data) {
        var div = selection;
        this.SVGContainer = d3.select(div).append('svg').attr('width', this.Width).attr('height', this.Height);
        //  
        //https://jsfiddle.net/r24e8xd7/9/
        var pack = d3.pack(data).size(this.Width, this.Width); //.padding(3);
        //var pack = d3.layout.pack().sort(null).size([this.Width, this.Width]);
        /*  data.children.sort(function(){return null} /*function(a,b){
                if( a.name<b.name) return -1;
                if(a.name>b.name) return 1;
                return 0;
   
            }*/
        // d3.packSiblings(data);
        //to append a circle to each data.
        this.node = this.SVGContainer.selectAll("node").data(pack(d3.hierarchy(data)).descendants())
            .enter().append('g').classed('node', true);
        this.node.selectAll("circle").data(data.children).enter().append("circle")
            .attr("r", function (d) { return d.radius; })
            .style("fill", function (d) { return d.color; })
            .style("opacity", function (d) { return 1; });
        /*    this.node.append("text").
                attr("x", function(d){ return d.cx; })
                .attr("y", function(d){ return d.cy + 5; })
                .attr("text-anchor", "middle")
                .text(function(d){ return d.name; })
                .attr("font-size",function(d){return d.radius/3+"px";});
          */
        this.forceSimulation(data);
        /*.style({
            "fill":"black",
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "59px",
            
        });*/
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