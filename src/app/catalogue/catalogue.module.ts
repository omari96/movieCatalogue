import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { catalogueRoutingModule } from './catalogue-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieApiService, MOVIE_BASE_URL } from './service/movie-api.service';
import { environment } from 'src/environments/environment';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { FireApiService } from './service/fire-api.service';


@NgModule({
  declarations: [
    CatalogueComponent,
    AddMovieComponent,
    MovieListComponent,
    MovieListItemComponent,
  ],
  imports: [
    CommonModule,
    catalogueRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    FireApiService,
    MovieApiService,{
      provide: MOVIE_BASE_URL,
      useValue:environment.movieApiBase
    }
  ]

})
export class CatalogueModule { }
