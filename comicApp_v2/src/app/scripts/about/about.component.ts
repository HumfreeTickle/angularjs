import { Component , OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'about-page',
    templateUrl: '/app/views/about.html'
})
export class AboutComponent  implements OnInit {
    title: string = 'Comic App - About';

    constructor() { }

    ngOnInit() {  
        console.log("Welcome to the About Page");
    }
}