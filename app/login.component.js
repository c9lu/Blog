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
var AuthenticationService_1 = require('./AuthenticationService');
var router_1 = require('@angular/router');
var user_1 = require('./user');
var $ = require('jquery');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
//http://4dev.tech/2016/03/login-screen-and-authentication-with-angular2/
var LoginComponent = (function () {
    function LoginComponent(route, location, authService, formBuilder) {
        this.route = route;
        this.location = location;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.userInfo = new core_1.EventEmitter();
        this.ValidAccount = true;
        // @Out
        this.attemptSubmit = 0;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.validateEmail = function (email) {
        var EMAIL_FORMAT = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (email.value != "" && EMAIL_FORMAT.test(email.value)) {
            return null;
        }
        else {
            return { validateEmail: false };
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _self = this;
        _self.loginForm = new forms_1.FormGroup({
            //  input:''
            input: new forms_1.FormControl('', forms_1.Validators.required) //Validators.required]
        });
        _self.registerForm = _self.formBuilder.group({
            email: new forms_1.FormControl('', [this.validateEmail, forms_1.Validators.required]),
            name: new forms_1.FormControl('', forms_1.Validators.required)
        });
        $("#loader").hide();
        $("#loginBtn").hide();
        //this.returnURL= this.router.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.user); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "input", {
        get: function () { return this.loginForm.get('input'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "email", {
        get: function () { return this.registerForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "name", {
        get: function () { return this.registerForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.register = function () {
        //alert('hi');
        var _self = this;
        _self.attemptSubmit = 2;
        if (_self.registerForm.controls["email"].valid == false) {
            return;
        }
        var _email = _self.registerForm.get('email');
        var _name = _self.registerForm.get('name');
        if (_email == null || _email.value == "" || _name == null || _name.value == "") {
            _self.message = "Please enter your email and name to register.";
        }
        else {
            var user = { email: _email.value, name: _name.value };
            _self.authService.register(user).subscribe(function (response) {
                return _self.authService.login(user.name).subscribe(function () {
                    window.location.assign('./');
                });
            });
        }
    };
    LoginComponent.prototype.login = function () {
        // let body = {username, email};
        var _this = this;
        this.attemptSubmit = 1;
        if (this.loginForm.valid == false) {
            return;
        }
        var _self = this;
        _self.authService.login(_self.loginForm.get('input').value).subscribe(function (response) {
            var user = response;
            if (user == null) {
                _self.message = _self.loginForm.get('input').value + " is not found in the database, you need to register first.";
                _self.ValidAccount = false;
                $("#loginpanel").hide();
            }
            else {
                _self.user.email = response.email;
                _self.user.name = response.name;
                _self.ValidAccount = true;
                _this.userInfo.emit(_self.user);
                _self.location.back();
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "userInfo", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './app/login.component.html',
            styleUrls: ['./app/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, AuthenticationService_1.AuthService, forms_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=Login.Component.js.map