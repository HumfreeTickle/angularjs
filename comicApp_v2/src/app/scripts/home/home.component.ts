import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'hpme-page',
    templateUrl: '/app/views/home.html'
})

export class HomeComponent{
    comics: ComicBook[] = [];
    names: string[] = ['Fantastic Four', 'X-Men', 'Hulk', 'Spider-Man', 'Batman'];
    title: string = 'Comic App - Home';
    constructor() { this.createComics();}

    createComics() : void {
            for (var i = 1; i <= this.names.length; i++) {
                var newComic = new ComicBook(this.names[i - 1], 'Issue ' + i,this.names[i - 1],'./app/images/' + this.names[i - 1].replace(' ', '').toLowerCase() + '.jpg',this.names[i - 1].replace(' ', ''),);
                this.comics.push(newComic);
            };
        };
}

class ComicBook{
        constructor(
            public Name: string,
            public Issue: string,
            public Series: string,
            public Image: string,
            public refName: string){}

        public refIssue: number = 1;
    }