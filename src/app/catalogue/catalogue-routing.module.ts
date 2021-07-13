import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CatalogueComponent } from './catalogue.component';

export const routes: Route[] = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'add',
    component: AddMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class catalogueRoutingModule { }
