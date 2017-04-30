
var d3 = require("d3");


export class D3Bubbles{

    public chart:this;
    Width: number;
    Height :number;
    SVGContainer;
    node;
   // gradientDictionary={};
   
    constructor (){}
    

    gradientTheColor(colorcode:string)
    {
        var gradientColor = this.SVGContainer.append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient" + colorcode);

        gradientColor.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#FBEFFB");

        gradientColor.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", colorcode);

    }
    
    public Chart (div, dataset, isEven){
        
   
        var bubble = d3.pack(dataset).size([this.Width,this.Height]).padding(280);
        
       
        this.SVGContainer = d3.select(div).append('svg')
                            .attr('width', this.Width)
                            .attr('height',this.Height)
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
                });
        
      this.node.transition()
         
        .attr("transform", function(d) {
          
                return "translate(" + d.x + "," + d.y + ")";
            });;
      let me = this;
    
    var circle = this.node.append("circle")
                .attr("r", function (d) { return d.r*1.1; })
                   .style("fill", function(d) { 
                       me.gradientTheColor(d.data.color)
                       return "url(#radial-gradient"+d.data.color+")"; })
                   .style("opacity", function(d){return 1})
                   ;
     
     circle.on("mousedown", function(d){
           // alert(d.r);
        
          d3.select(this).attr("r",function(d){
             return d.r*1.5
            }
            );
      });

      circle.on("mouseup", function(d){

        d3.select(this).attr("r", function(d){
            return d.r
        })

      })
                  
    this.node.append("text").
            attr("cx", function(d){ 
               return d.x; 
            
        })
            .attr("cy", function(d){ return d.y; })
            .attr("text-anchor", "middle")
            .attr("id", function(d){
                var id = d.data.name.replace(" ", "_");
                return id.substring(1)})
            .attr("class", "bubbles")
            .style("cursor","pointer")            
            .text(function(d){ return d.data.name; })
            .attr("font-size",function(d){return d.r/2.3+"px";})
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");

     
        
       d3.selectAll("g.nodeE").transition().duration(1500)
        .attr("transform", function(d) {
        
          if(typeof d!= 'undefined')
         
                if(d.y<(400))
                    return "translate(" + (d.x-150) + "," + (d.y-28) + ")";
                else
                    return "translate(" + (d.x-150) + "," + (d.y+28) + ")";

        });

         d3.selectAll("g.nodeO").transition().duration(1500)
        .attr("transform", function(d) {
          
          if(typeof d!= 'undefined')
              if(d.y<(400))
                return "translate(" + (d.x-150) + "," + (d.y-28) + ")";
              else
                  return "translate(" + (d.x-150) + "," + (d.y+28) + ")";

        });

       
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