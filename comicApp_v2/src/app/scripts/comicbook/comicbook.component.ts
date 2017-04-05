import { Component } from '@angular/core';
import { ComicBookService } from './comicbook.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'comicbook-page', 
    templateUrl: '/app/views/comicbook.html'
})

export class ComicbookComponent{
    private pages: Array<string>;
    page: string;
    currentPage: number = 0;
    private series:string;
    private issue:string;
    title: string = 'Comic App - ComicBook';

    private comicbookService: ComicBookService;

    constructor(private route: ActivatedRoute, comicbookService: ComicBookService) {
        this.route.params.subscribe(params => {
            this.series = params['series'];
            this.issue = params['issue']; 
        });
        this.comicbookService = comicbookService;

        this.comicbookService.getPages(this.series)
        .subscribe(
            data => this.getPages(data, this.issue),
            error => console.log(error)
        );
    }

    changePage(changePage:string): void {
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
    }

    getPages(result:Array<string>, issue:string): void{
        this.pages = result['issue_' + issue];
        this.updatePage();
    }

    updatePage() {
        if (this.pages != null) {
            this.page = this.comicbookService.image_server + this.series + this.pages[this.currentPage];
        }
    }
}