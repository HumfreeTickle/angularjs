import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AboutComponent  implements OnInit {
    name:string = 'About Page';
    constructor() { }

    ngOnInit() {  
        console.log("Welcome to the About Page");
    }
}