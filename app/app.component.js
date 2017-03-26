"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//var mongoose = require("./mango.api.js")
var core_1 = require('@angular/core');
//https://github.com/angular/angular/issues/10646
var AppComponent //implements OnInit
 = (function () {
    function AppComponent //implements OnInit
        () {
    }
    AppComponent //implements OnInit
     = __decorate([
        core_1.Component({
            selector: 'my-app-2',
            ////<li *ngFor =" let post of Posts"><span>{{post.title}}</span>
            ///<post-detail [post]="post"></post-detail>   
            ///</li>
            template: " <div><bubble-panes-right class=\"column-right\"></bubble-panes-right></div>\n  <div class=\"column-center\"><router-outlet>\n  </router-outlet></div>\n<div class=\"column-left\">\n <bubble-panes-left></bubble-panes-left>\n \n </div>\n  ",
            styles: ['.column-left{ float: left; width: 20%;}.column-right{ float: right; width: 20%; }.column-center{ display: inline-block; width: 60%; }']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent //implements OnInit
    );
    return AppComponent //implements OnInit
    ;
}());
exports.AppComponent //implements OnInit
 = AppComponent //implements OnInit
;
//# sourceMappingURL=app.component.js.map