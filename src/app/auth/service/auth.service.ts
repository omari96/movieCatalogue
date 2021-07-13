import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SinginForm, SingupForm, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;


  get isLoginedIn(): boolean {
    return !!this._user;
  }

  get userId(): string {
    return this._user.uid;
  }

  constructor(private auth: AngularFireAuth,) {
    this.auth.onAuthStateChanged((user) => {
      this._user = user;
    })
  }

  signIn({ email, password }: SinginForm) {
    return this.auth.signInWithEmailAndPassword(email, password).then(() => {
    })
  }

  signUp({ email, password }: SingupForm) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(() => {
    })
  }

  signOut() {
    return this.auth.signOut();
  }

}

