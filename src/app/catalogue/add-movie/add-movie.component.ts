import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../service/movie-api.service';
import { catchError, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieBody, Country, Movie, MovieResult, REITINGS, Status, WhenToWatchSelect, WHEN_TO_WATCH } from '../catalogue.model';
import { forkJoin, from, Observable, of, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/service/loading.service';
import { FireApiService } from '../service/fire-api.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  private unsubscribe$ = new Subject();

  searchKey: string;
  hasError: boolean;
  lastThreeSearches: string[] = [];
  form: FormGroup;
  status = Status;
  submited = false;
  subs: Subscription[] = [];

  private _selectMovie: Movie;

  get selectedMovie(): Movie {
    return this._selectMovie
  }

  get whenToWatch(): WhenToWatchSelect[] {
    return WHEN_TO_WATCH;
  }
  get ratings(): number[] {
    return REITINGS;
  }

  get canWatchLater(): boolean {
    return !!this.form.get('whenToWatch');
  }


  constructor(
    private movieApiService: MovieApiService,
    private loadingService: LoadingService,
    private storage: StorageService,
    private fb: FormBuilder,
    private fireApiServie: FireApiService,
    private auth: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  private addToLastSearches(name: string) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      return;
    }
    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];
    this.storage.set('lastThreeSearches', this.lastThreeSearches)
  }

  private restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }


  private createForm() {
    this.form = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: (2),
      status: [Status.Watched]
    })
  }


  private addControlsByStatus(status: Status) {
    switch (status) {
      case Status.WatchedLater:
        this.form.addControl('whenToWatch', new FormControl(null, Validators.required));
        break;

      case Status.Watched:
        this.form.removeControl('whenToWatch');
        break;
    }
  }


  submit() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const body: MovieBody = {
      imdbId: this._selectMovie.imdbId,
      uId: this.auth.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToWatch: value.whenToWatch || '',
    }
    this.loadingService.start();
    this.fireApiServie.addMovie(body)
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => this.reset());
  }

  private reset() {
    this._selectMovie = null;
    this.form.reset();
    this.form.updateValueAndValidity();
    this.submited = false;

    this.translateService.get('catalogue.MOVIE_HAS_BEEN_ADDED').subscribe(value => this.toastr.success(value));

  }

  ngOnInit(): void {
    this.restoreState();
    this.createForm();

    this.form.get('status').valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((status) => this.addControlsByStatus(status));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(key: string) {
    if (!key) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.addToLastSearches(key);
    this.fetchMovie(key)
  }

  private getCountryWithPopulation(code: string): Observable<Country> {
    return this.movieApiService.getCountry(code).pipe(
      map((c) => {
        const country = c[0];
        return {
          code: country.alpha2Code,
          population: country.population
        }
      }),
      catchError(() => {
        return of(null)
      })
    )
  }

  private mapMovie(movie: MovieResult, countries: Country[]): Movie {
    return {
      actors: movie.Actors,
      countries: countries,
      director: movie.Director,
      genre: movie.Genre.split(', '),
      imdbId: movie.imdbID,
      plot: movie.Plot,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
    }
  }

  getCountryFlag(code: string): string {
    return `https://www.countryflags.io/${code}/shiny/64.png`
  }

  fetchMovie(name: string) {
    this.loadingService.start();
    this.movieApiService
      .getMovieByName(name)

      .pipe(finalize(() => {
        this.loadingService.stop();
        this.searchKey = '';
      }),
        switchMap(movie => {
          const countries = movie.Country.split(', ');
          return forkJoin(
            countries.map((code) => this.getCountryWithPopulation(code))
          ).pipe(map<Country[], Movie>(countries => this.mapMovie(movie, countries))
          );
        }))
      .subscribe(movie => (
        this._selectMovie = movie
      ));
  }



}
