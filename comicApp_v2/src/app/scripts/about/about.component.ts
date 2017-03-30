import { Component , OnInit} from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'comicApp',
    template: `<h1>This is the {{name}}</h1>`
})

export class AboutComponent implements OnInit {
    name:string = 'About Page';
    constructor() { }

    ngOnInit() {  
        console.log("Welcome to the About Page");
    }
}
