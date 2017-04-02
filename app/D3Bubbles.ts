
var d3 = require("d3");

export class D3Bubbles{

    public chart:this;
    Width: number;
    Height :number;
    SVGContainer;
    node;

    constructor (){}
    
    public forceSimulation(data): void{
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
       
       
        d3.selectAll("circle").transition().style("opacity",0.4).duration(1700);
    


    }
    public Chart (div, dataset, isEven){
        
   
        var bubble = d3.pack(dataset).size([800,800]).padding(280);
        
       
        this.SVGContainer = d3.select(div).append('svg')
                            .attr('width', 800)
                            .attr('height',800)
                            .attr("class","bubble");

       //https://jsfiddle.net/r24e8xd7/9/
      
        //to append a circle to each data.
     

       var nodes = d3.hierarchy(dataset).sum(function(d) { return d.frequency; });
      
        this.node = this.SVGContainer.selectAll("node").data( 
                    bubble(
                       nodes
                ).descendants())
                .enter()
                 .filter(function(d){
                return  !d.children
                 })
                .append('g').attr("class", 
                function(){
                  if(isEven==false){
                    return "nodeO";
                    }
                  else{

                    return "nodeE";
                  }
                });//.attr("x", function(d){return d.x;})
        
      this.node.transition()
         //.duration(5000)
        .attr("transform", function(d) {
          //  alert(JSON.stringify(d));
                return "translate(" + d.x + "," + d.y + ")";
            });;
      
     this.node.append("circle")
                .attr("r", function (d) { return d.r; })
                   .style("fill", function(d) { return d.data.color; })
                   .style("opacity", function(d){return 1})
                   ;
   this.node= this.node.append("text").
            attr("cx", function(d){ 
               return d.x; 
            //else return -d.data.x;    
        })
            .attr("cy", function(d){ return d.y; })
            .attr("text-anchor", "middle")
            .text(function(d){ return d.data.name; })
            .attr("font-size",function(d){return d.r/3+"px";});

        
    d3.selectAll("g.nodeE").transition().duration(1500)
        .attr("transform", function(d) {
          //  alert(JSON.stringify(d));
          if(typeof d!= 'undefined')
         
                if(d.y<(400))
                    return "translate(" + (d.x-150) + "," + (d.y-28) + ")";
                else
                    return "translate(" + (d.x-150) + "," + (d.y+28) + ")";

        });

         d3.selectAll("g.nodeO").transition().duration(1500)
        .attr("transform", function(d) {
          //  alert(JSON.stringify(d));
          if(typeof d!= 'undefined')
              if(d.y<(400))
                return "translate(" + (d.x+150) + "," + (d.y-28) + ")";
              else
                  return "translate(" + (d.x+150) + "," + (d.y+28) + ")";

        });
    

       
    
        
      
    
        
    //    this.forceSimulation(data);
        /*.style({
            "fill":"black", 
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "59px",
            
        });*/
       
    }
    public SetWidth (value){

        this.Width = value;
        return this;

    }

    public SetHeight(value){
        this.Height = value;
        return this;
    }

    

}