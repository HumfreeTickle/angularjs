import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent }  from '../about/about.component';
import { ComicbookComponent } from '../comicbook/comicbook.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  // Route path
    { path: '', component: HomeComponent, data: {title: 'Home Page'}},

  // Other sections
  { path: 'about', component: AboutComponent, data: {title: 'About Page'}},
  { path: ':series/issue/:issue', component: ComicbookComponent, data: {title: 'Series'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


