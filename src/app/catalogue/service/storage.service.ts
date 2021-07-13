import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  set<T>(key: string, arg: T) {
    localStorage.setItem(key, JSON.stringify(arg))
  }



}


