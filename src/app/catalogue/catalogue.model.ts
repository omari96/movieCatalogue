export enum Status {
  Watched = 'Watched',
  WatchedLater = "WatchLater"
}

export enum WhenToWatch {
  Tomorrow = 'Tomorrow',
  ThisWeek = 'ThisWeek',
  ThisMonth = 'ThisMonth',
  ThisYear = 'ThisYear'
}

export interface WhenToWatchSelect {
  label: string,
  value: WhenToWatch
}

export interface Movie {
  imdbId: string;
  title: string;
  year: string;
  director: string;
  actors: string;
  genre: string[];
  plot: string;
  poster: string;
  countries: Country[];
}
export interface MovieResult {
  imdbID: string;
  Title: string;
  Year: string;
  Director: string;
  Actors: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Country: string;
}

export interface Country {
  code: string;
  population: number;
}


export interface CountryResult {
  alpha2Code: string;
  population: number;
}

export interface MovieBody {
  imdbId: string;
  uId: string;
  review: string;
  rating: number;
  status: Status;
  whenToWatch: WhenToWatch;
}



export const WHEN_TO_WATCH: WhenToWatchSelect[] = [
  {
    label: 'catalogue.TOMORROW',
    value: WhenToWatch.Tomorrow
  },
  {
    label: 'catalogue.THIS_WEEK',
    value: WhenToWatch.ThisWeek
  },
  {
    label: 'catalogue.THIS_MONTH',
    value: WhenToWatch.ThisMonth
  }, {
    label: 'catalogue.THIS_YEAR',
    value: WhenToWatch.ThisYear
  }
]

export const REITINGS: number[] = [1, 2, 3, 4, 5];

export interface MovieListItem {
  data: MovieBody,
  movie: MovieResult
}
