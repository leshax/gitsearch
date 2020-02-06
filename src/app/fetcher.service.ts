import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  private url:string = "https://api.github.com/search/users"
  limit:number = 5;

  public getData(searchText: string){
    let url: string = `${this.url}?per_page=${this.limit}&q=${searchText}&type=Users`;
    return ajax.getJSON(url).pipe(
      map(userResponse => userResponse),
      catchError(error => {
        return of(error);
      }));
  }

  constructor() {
  }
}
