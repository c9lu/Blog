import {Component, ElementRef, ViewChild} from '@angular/core';

import 'rxjs/add/operator/map';


import {ActivatedRoute, Params, Router} from '@angular/router';

var d3 = require("d3");
var d3Result;


import {BlogService} from './Blog.service'; //import is from ES6.
import {D3Bubbles} from './D3Bubbles';

@Component({

    template: `<div #container></div>`,
    selector:'bubble-panes'
})
export class CreateBubbles{
    
  

    Data={children:[]} ;
    public isEven :Boolean = false;
  
    constructor (private blogService:BlogService, private router:Router){
      
    }
    
   
   @ViewChild('container') div:ElementRef
    
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
         }
        return color;
    }
    getD3Data(val){//for tags

        let data={children:[]};
        let index:number =0;
        for (var element in val){
         
            var randomNumberX = Math.random() * 200;
            var randomNumberY = Math.random()*700;
            var frequency = val[element].count;
            var color = this.getRandomColor();
         
            if(index % 2==0 && this.isEven==true ||  index % 2==1 && this.isEven==false){
                
                data.children.push({
                          "frequency":frequency*2.5,
                          "color":color, "name":"#"+element.toString(), "IsComment":val[element].IsComment,
                          "rfreq":frequency,"postid":val[element].IsComment==1?val[element].PostIDs[0]:0
                        
                       });
              if(val[element].IsComment==0){
               data.children.push({
                      "frequency":1,
                      "color":color, "name":"", "IsComment":val[element].IsComment

               })
              }
            }
               index++;
        }
        return data;
    }
    
    

   
     ngOnInit(){ 
        
        
 
     }
     ngAfterViewInit(){
        let me= this;
          d3Result =  this.blogService.getAllPostsTags_Frequency()
          if(d3Result!=null){
          d3Result.subscribe(val=>{

              this.Data= this.getD3Data(val);
           if(this.isEven==true)
                new D3Bubbles(me.router).SetWidth(700).SetHeight(850).Chart(this.div.nativeElement, this.Data, this.isEven);
            else
                new D3Bubbles(me.router).SetWidth(700).SetHeight(850).Chart(this.div.nativeElement, this.Data, this.isEven);
    
                

         });
          }
     
     }
}
@Component({

    template: `<div #container></div>`,
    selector:'bubble-panes-right',
    
})
export class rightBubbles extends CreateBubbles{
          
          
     constructor (private blogService2:BlogService,private router2:Router){
         
          super(blogService2,  router2);
           this.isEven = false;
    }

}
@Component({
    
    
    template: `<div #container></div>`,
    selector:'bubble-panes-left'

})
export class leftBubbles extends CreateBubbles{
 constructor (private blogService3:BlogService, private router3:Router){
          super(blogService3, router3);
          this.isEven = true;

    }
}
