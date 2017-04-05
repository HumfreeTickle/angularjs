import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './scripts/core/app.component';
import { AppRoutingModule } from './scripts/core/app.route';
import { AboutComponent }  from './scripts/about/about.component';
import { ComicbookComponent } from './scripts/comicbook/comicbook.component';
import { HomeComponent } from './scripts/home/home.component';

import { ComicBookService } from './scripts/comicbook/comicbook.service';


@NgModule({
  imports: [ 
    BrowserModule ,
    AppRoutingModule,
    HttpModule,
    JsonpModule
      ],
  declarations: [ 
    AppComponent,
    HomeComponent, 
    AboutComponent,
    ComicbookComponent
  ],
  providers: [ComicBookService],
  bootstrap:    [ AppComponent ]
})

export class AppModule {

}