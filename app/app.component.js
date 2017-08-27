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
var AuthenticationService_1 = require('./AuthenticationService');
var Blog_service_1 = require('./Blog.service');
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
            moduleId: module.id,
            templateUrl: 'app.html',
            styleUrls: ['app.css'],
            providers: [AuthenticationService_1.AuthService, Blog_service_1.BlogService]
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