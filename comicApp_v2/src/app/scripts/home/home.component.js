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
var HomeComponent = (function () {
    function HomeComponent() {
        this.comics = [];
        this.names = ['Fantastic Four', 'X-Men', 'Hulk', 'Spider-Man', 'Batman'];
        this.title = 'Comic App - Home';
        this.createComics();
    }
    HomeComponent.prototype.createComics = function () {
        for (var i = 1; i <= this.names.length; i++) {
            var newComic = new ComicBook(this.names[i - 1], 'Issue ' + i, this.names[i - 1], './app/images/' + this.names[i - 1].replace(' ', '').toLowerCase() + '.jpg', this.names[i - 1].replace(' ', ''));
            this.comics.push(newComic);
        }
        ;
    };
    ;
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'hpme-page',
        templateUrl: '/app/views/home.html'
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var ComicBook = (function () {
    function ComicBook(Name, Issue, Series, Image, refName) {
        this.Name = Name;
        this.Issue = Issue;
        this.Series = Series;
        this.Image = Image;
        this.refName = refName;
        this.refIssue = 1;
    }
    return ComicBook;
}());
//# sourceMappingURL=home.component.js.map