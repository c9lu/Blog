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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.apiURL = 'http://localhost:5000';
        this.s_userInfo = new core_1.EventEmitter();
    }
    AuthService.prototype.login = function (_input) {
        var _this = this;
        return this.http.get(this.apiURL + '/user/' + _input).map(function (response) {
            if (response.json() == null) {
                return null;
            }
            else {
                //we call .json method on the response because the actual response is not a collection of data but a JSON string.
                var responseObj = response.json(); //.json();
                var user = new User();
                user.email = responseObj.email;
                user.name = responseObj.user;
                _this.s_userInfo.emit(user);
                return user;
            }
        });
    };
    AuthService.prototype.register = function (credentials) {
        return this.http.post(this.apiURL + '/register', credentials).map(function (response) {
            return response;
        });
    };
    /*public getUserInfo(id: number) {
      return this.http.get(this.apiURL+'/Users/'+id).map(
        response=>{
           return response;
  
        }
  
  
      );//this.currentUser;
    }*/
    AuthService.prototype.logout = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=AuthenticationService.js.map