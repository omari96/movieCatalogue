// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movieApiBase: 'http://www.omdbapi.com/?apikey=540d1872',
  firebase: {
    apiKey: "AIzaSyCzGHJtTiFnBOZStpXqOmSEmI_yDKjt_6Y",
    authDomain: "movie-catalogue-63722.firebaseapp.com",
    projectId: "movie-catalogue-63722",
    storageBucket: "movie-catalogue-63722.appspot.com",
    messagingSenderId: "367477437350",
    appId: "1:367477437350:web:0b339ed5dea2c662439567"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
