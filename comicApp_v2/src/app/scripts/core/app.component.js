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
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var AppComponent = (function () {
    function AppComponent(router, activatedRoute, titleService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) { return _this.titleService.setTitle(event['title']); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: "/app/views/header.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        platform_browser_1.Title])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map