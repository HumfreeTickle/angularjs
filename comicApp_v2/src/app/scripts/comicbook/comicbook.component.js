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
var core_1 = require("@angular/core");
var comicbook_service_1 = require("./comicbook.service");
var router_1 = require("@angular/router");
var ComicbookComponent = (function () {
    function ComicbookComponent(route, comicbookService) {
        var _this = this;
        this.route = route;
        this.currentPage = 0;
        this.title = 'Comic App - ComicBook';
        this.route.params.subscribe(function (params) {
            _this.series = params['series'];
            _this.issue = params['issue'];
        });
        this.comicbookService = comicbookService;
        this.comicbookService.getPages(this.series)
            .subscribe(function (data) { return _this.getPages(data, _this.issue); }, function (error) { return console.log(error); });
    }
    ComicbookComponent.prototype.changePage = function (changePage) {
        switch (changePage) {
            case 'left':
                if (this.currentPage > 0) {
                    this.currentPage -= 1;
                    this.updatePage();
                }
                break;
            case 'right':
                if (this.currentPage < this.pages.length) {
                    this.currentPage += 1;
                    this.updatePage();
                }
                break;
            default:
                console.log('Invaild switch case');
        }
    };
    ComicbookComponent.prototype.getPages = function (result, issue) {
        this.pages = result['issue_' + issue];
        this.updatePage();
    };
    ComicbookComponent.prototype.updatePage = function () {
        if (this.pages != null) {
            this.page = this.comicbookService.image_server + this.series + this.pages[this.currentPage];
        }
    };
    return ComicbookComponent;
}());
ComicbookComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'comicbook-page',
        templateUrl: '/app/views/comicbook.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, comicbook_service_1.ComicBookService])
], ComicbookComponent);
exports.ComicbookComponent = ComicbookComponent;
//# sourceMappingURL=comicbook.component.js.map