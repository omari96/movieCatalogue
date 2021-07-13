import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MovieBody, MovieListItem, MovieResult } from '../catalogue.model';
import { FireApiService } from '../service/fire-api.service';
import { MovieApiService } from '../service/movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies$: Observable<MovieListItem[]>;

  constructor(
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService
  ) { }

  ngOnInit(): void {
    this.movies$ = this.fireApiService.getMovies()
      .pipe(
        switchMap(data => {
          return forkJoin(data.map(d => this.movieApiService.getMovieByImdbId(d.imdbId).pipe(
            map<MovieResult, MovieListItem>((movie) => ({
              data: d,
              movie,
            }))
          ))
          );
        })
      )

  }

}
