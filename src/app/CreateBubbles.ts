

import {Component, ElementRef, ViewChild} from '@angular/core';

import 'rxjs/add/operator/map';
///<reference path="../node_modules/d3/build/d3.js"/>


var d3 = require("d3");


import {BlogService} from './Blog.service'; //import is from ES6.
import {D3Bubbles} from './D3Bubbles';

@Component({
    providers:[BlogService],
    template: `<div #container></div>`,
    selector:'bubble-panes'
})
export class CreateBubbles{
    
  

    Data={children:[]} ;
    public isEven :Boolean = false;
  
    constructor (private blogService:BlogService){
      
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
    getD3Data(val){

        let data={children:[]};
        let index:number =0;
        for (var element in val){
         
            var randomNumberX = Math.random() * 200;
            var randomNumberY = Math.random()*700;
            var frequency = val[element];
            var color = this.getRandomColor();
         
            if(index%2==0 && this.isEven==true ||  index%2==1 && this.isEven==false){
                data.children.push({
                          "cx": randomNumberX+50, "cy":randomNumberY,"radius": frequency*50,
                          "color":color, "name":element.toString()
                          //name: element.toString(), 
                       });
            }
               index++;
        }
        return data;
    }
    
    

   
     ngOnInit(){ 
        
        
 
     }
     ngAfterViewInit(){
    
        this.blogService.getAllPostsTags_Frequency().subscribe(val=>{

              this.Data= this.getD3Data(val);
           
            new D3Bubbles().SetWidth(500).SetHeight(800).Chart(this.div.nativeElement, this.Data);
      
            

         });
     
     }
}
@Component({
    providers:[BlogService],
    template: `<div #container></div>`,
    selector:'bubble-panes-right',
    
})
export class rightBubbles extends CreateBubbles{
          
          
     constructor (private blogService2:BlogService){
         
          super(blogService2);
           this.isEven = false;
    }

}
@Component({
    
    providers:[BlogService],
    template: `<div #container></div>`,
    selector:'bubble-panes-left'

})
export class leftBubbles extends CreateBubbles{
 constructor (private blogService3:BlogService){
          super(blogService3);
          this.isEven = true;

    }
}
