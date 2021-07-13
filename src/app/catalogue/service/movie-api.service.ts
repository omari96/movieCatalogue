import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryResult, MovieResult } from '../catalogue.model';

export const MOVIE_BASE_URL = new InjectionToken<string>('movie api token');

@Injectable()

export class MovieApiService {

  constructor(
    @Inject(MOVIE_BASE_URL)
    private baseUrl: string,
    private http: HttpClient) { }

  getMovieByName(name: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${this.baseUrl}&t=${name}`)
  }

  getCountry(code: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(`https://restcountries.eu/rest/v2/name/${code}?fullText=true`);
  }

  getMovieByImdbId(imdbId: string): Observable<MovieResult> {
   return this.http.get<MovieResult>(`${this.baseUrl}&i=${imdbId}`)
  }
}



