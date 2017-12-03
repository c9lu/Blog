import {Component} from '@angular/core';
import {OnInit, Directive} from '@angular/core'

var d3 = require("d3");


@Component({
    selector:'top-bottom-bubbles',
    template:'<div></div>'
})
export class BubblesTopBottom implements OnInit{
   public position:string;
     chartWidth:Number = window.innerWidth;
   chartHeight:Number = 100;
   svg :any;
    _data=[];
   constructor(){
     
   }
 

    private getRandomArbitary(min, max): Number{

        return Math.random()*(max-min)+min;
    }
    private  getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
         }
        return color;
    }
    ngOnInit(){
        var self= this;
         if(this.position=='top')
       {
              this.svg = d3.select(".topbubbles").append("svg");

       }
       else{
              this.svg = d3.select(".bottombubbles").append("svg");
       }
        self.svg.attr("height", this.chartHeight)
        .attr("width", this.chartWidth);
        for (let i =0; i<(window.innerWidth/10); i=i+2){
            self._data.push({
                x:self.getRandomArbitary(i, window.innerWidth), //i+ Math.random()*12+1,
                y:self.getRandomArbitary(10, 35),
                r:self.getRandomArbitary(15, 30),
                

            })
        } 
        this.renderBubbles();
    }

    renderBubbles(){
        var self = this;
       
        self.svg = self.svg.append("g");
        this._data.forEach(function(list, i){
            self.svg.append("circle")
            .attr('r', list.r)
            .attr("cx", function(d){
                return list.x
            })
            .attr("cy", function(d)
            {
                return list.y
            })
            .style("fill", function(){return self.getRandomColor() } )
        
        })
    }

}

@Component({
    template: `<div style="height:100px;top:0px;position:fixed; z-index:5" class="topbubbles"></div>`,
    selector:'top-bubbles'

})

export class topBubbles extends BubblesTopBottom{
  constructor()
  { 
       
      super();
      this.position= "top";
    
  }
}
@Component({
    template:`<div style="height:100px;  bottom:0px; position:fixed; z-index:5; transform: rotate(180deg);" class="bottombubbles"></div>`,
    selector:'bottom-bubbles'
})

export class bottomBubbles extends BubblesTopBottom{
    constructor(){
        super();
        this.position="bottom";
  }
}