import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MovieBody } from '../catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  constructor(
    private store: AngularFirestore,
    private auth: AuthService
  ) { }

  addMovie(body: MovieBody) {
    return from(this.store.collection('catalogue').add(body))
  }

  getMovies(): Observable<MovieBody[]> {
    return this.store.collection<MovieBody>('catalogue', (ref) =>
      ref.where('uId', '==', this.auth.userId)
    ).valueChanges();
  }
}
