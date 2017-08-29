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
var core_1 = require('@angular/core');
//import {AuthService} from './AuthenticationService'
var AuthenticationService_1 = require('./AuthenticationService');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var AppHeader = (function () {
    function AppHeader(authService, route, location) {
        var _this = this;
        this.authService = authService;
        this.route = route;
        this.location = location;
        authService.s_userInfo.subscribe(function (userinfo) {
            //     alert(userinfo.name);
            // $("#username").text(userinfo.name);
            _this.userName = userinfo.name;
            localStorage.setItem("chenplayground", _this.userName);
        });
    }
    AppHeader.prototype.logout = function () {
        localStorage.setItem("chenplayground", "");
        window.location.reload();
    };
    AppHeader.prototype.ngOnInit = function () {
        this.userName = localStorage.getItem("chenplayground");
        if (this.userName != null && this.userName != "") {
            $("#loginBtn").hide();
            $("#logoutBtn").show();
        }
        else {
            //logged out
            $("#loginBtn").show();
            $("#logoutBtn").hide();
        }
        if (this.userName == "") {
            this.userName = "guest";
        }
    };
    AppHeader = __decorate([
        core_1.Component({
            selector: 'appheader',
            template: "\n<div>\n\n  \n  <div style=\"margin: 0 auto; width:70%\"> \n\n   \n    <a href=\"\" style=\"color:#ff3399;font-family:segoe print; text-align: center; font-size:30px; float:left\">\n    Hello <span>{{userName==null|| userName ==\"\"?\"guest\":userName}}, welcome!</span></a>\n\n\n \n</div>\n\n<div> <a href=\"./Login\" style=\"font-size:22px; color:white; float:right; padding:5px\" id=\"loginBtn\">Login</a>\n<button (click)=\"logout()\" style=\"font-size:22px; color:white; float:right; padding:5px;background-color:black; border:black; cursor:pointer\" id=\"logoutBtn\">Logout</button>\n</div>\n\n"
        }), 
        __metadata('design:paramtypes', [AuthenticationService_1.AuthService, router_1.Router, common_1.Location])
    ], AppHeader);
    return AppHeader;
}());
exports.AppHeader = AppHeader;
//# sourceMappingURL=app.header.js.map