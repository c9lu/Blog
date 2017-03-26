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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var post_detail_1 = require('./post-detail');
var AppRoutes_1 = require('./AppRoutes');
var Blog_component_1 = require("./Blog.component");
var http_1 = require('@angular/http');
var CreateBubbles_1 = require("./CreateBubbles");
var CreateBubbles_2 = require("./CreateBubbles");
var Blog_service_1 = require('./Blog.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule,
                //
                AppRoutes_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                Blog_component_1.BlogComponent,
                post_detail_1.PostDetailComponent,
                CreateBubbles_1.rightBubbles,
                CreateBubbles_2.leftBubbles
            ],
            providers: [
                Blog_service_1.BlogService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map