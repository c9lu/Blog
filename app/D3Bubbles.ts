
import {ActivatedRoute, Params, Router} from '@angular/router';
var d3 = require("d3");
var node;

export class D3Bubbles{

    public chart:this;
    Width: number;
    Height :number;
    SVGContainer;
  //  node;
   // gradientDictionary={};
   
    constructor ( private router:Router ){}
    

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
    public decorateCommentBubbles(){
    
         var commentgroup = d3.selectAll(".comment").append("g");
        commentgroup.append("svg:image")
  
                .attr("width",function(d){
                    return d.r * 2
                })
                .attr("height",function(d){return d.r *1.5})
                .attr("xlink:href", "Images/purplecomment.png")
                .attr("x", function(d){
                    return -(d.r);
                }).attr("y", function(){
                    return -25
                })
                 .style("opacity", function(d){return 0.65})
                  .style("cursor","pointer")   
                 ;
  
        commentgroup.append("text").text(function(d){
          if(d.data.rfreq>2)
           return d.data.rfreq;
         else return "";
         }).attr("font-size",function(d){ return d.data.rfreq*5})
         .attr("y", function(d){return -22;})
        .style("cursor","pointer") ;
    
        
    }
    public Chart (div, dataset, isEven){
        
   
        var bubble = d3.pack(dataset).size([this.Width,this.Height]).padding(100);
        
       
        this.SVGContainer = d3.select(div).append('svg')
                            .attr('width', this.Width)
                            .attr('height',this.Height)
                            .attr("class","bubble");

       //https://jsfiddle.net/r24e8xd7/9/
      
        //to append a circle to each data.

        ///to append image https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js
     

       var nodes = d3.hierarchy(dataset).sum(function(d) { return d.frequency; });
          var _class=""
        node = this.SVGContainer.selectAll("node").data( 
                    bubble(
                       nodes
                ).descendants())
                .enter()
                 .filter(function(d){
                return  !d.children 
                 })
                .append('g').attr("class", 
                function(d){
                
                  if(isEven==false){

                    
                    _class= "nodeO";
                    }
                  else{

                    _class= "nodeE";
                  }
                  if(d.data.IsComment==0){

                      return _class+" circle";
                  }
                  else{
                      return _class+" circle comment";
                  }

                });
       
  
      let me = this;
    
                
         
    var circle = d3.selectAll("."+_class+".circle").append("circle")
   
                .attr("r", function (d) { 
                    return d.r*1.1; 
                })
                   .style("fill", function(d) { 
                       me.gradientTheColor(d.data.color)
                       return "url(#radial-gradient"+d.data.color+")"; })
                   .style("opacity", function(d){return 1})
                  ;
                
   

    this.decorateCommentBubbles();
  
     var text = d3.selectAll(".circle").append("text")
   
            .attr("text-anchor", "middle")
            .attr("id", function(d){
                var id = d.data.name.replace(" ", "_");
                return id.substring(1)})
            .attr("class", 
            function(d){
                if(d.data.IsComment==1)
                    return "c_bubbletext";
                else return "bubbletext";
            })
            .style("cursor","pointer")            
            .text(function(d){ 
                if(d.data.IsComment==1){
                    
                  if(d.data.rfreq>2){
                         return d.data.name.substring(1, 12)+"..."
                    }
                    else{
                        return d.data.rfreq;
                    }
                   
                }
                else return d.data.name.replace("_"," "); })
            .attr("font-size",function(d){
                if(d.data.IsComment ==1){
                    return "20px";
                }
                return d.r/2.3+"px";})
                
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");

     

      d3.selectAll(".bubbletext").on("mousedown", function(d){
            var tag = d.data.name.substring(1);
             me.router.navigate(['/Tags', tag]);
      })
        d3.selectAll(".comment").on("mousedown", function(d){
            var title = d.data.name;
           // alert(d.data.postid);
            me.router.navigate(['/Posts', d.data.postid])
        })
        
        
       d3.selectAll("g.nodeE").transition().duration(1500)
        .attr("transform", function(d) {
        
           if(typeof d!= 'undefined')
           {     
                if(d.y<(400))
                    return "translate(" + (d.x-80) + "," + (d.y-90) + ")";
                else
                    return "translate(" + (d.x-80) + "," + (d.y-20) + ")";

           }  

        });

         d3.selectAll("g.nodeO").transition().duration(1500)
        .attr("transform", function(d) {
          
          if(typeof d!= 'undefined')
           
              if(d.y<(400))
                return "translate(" + (d.x-0) + "," + (d.y-90) + ")";
              else
                  return "translate(" + (d.x-0) + "," + (d.y-20) + ")";

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