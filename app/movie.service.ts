import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, debounceTime, filter, map, mergeAll, mergeMap, switchMap, tap } from 'rxjs';
import { IMovie, IMovieSearchResult, ISearchResult } from './movie.model';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  
  initialized= false;

  protected resourceUrl = "http://www.omdbapi.com/?apikey=61e1825c";

  private _filter= new Subject<string>();
  filter$= this._filter.asObservable();
  term= '';


  items$: Observable<IMovieSearchResult[]> | undefined;
  result$: Observable<ISearchResult> | undefined;

  //favorites: IMovieSearchResult[]=[];

  private _favorites= new BehaviorSubject<IMovieSearchResult[]>([]);
  favorites$= this._favorites.asObservable();


  constructor(
    protected http: HttpClient
  ) { 
    this.items$=
     this.filter$
      .pipe
      ( 
        debounceTime(1000),
        switchMap(t=> this.query({s:this.term })),
        map(r=> r.body?.Search!)
      );

      this.favorites$
      .subscribe(
        
          f =>  {
            if (this.initialized) {
              localStorage.setItem('favorites', JSON.stringify(f));
            } else  {
              this.initialized= true;            
            }
          }
      );


      let persited= localStorage.getItem('favorites') ?? "[]";
      if (persited)
        this._favorites.next(JSON.parse(persited) as IMovieSearchResult[]);

  }



  isFavorite(movie: IMovieSearchResult) {
    return this._favorites.value.find(i=> i.imdbID === movie.imdbID) !== undefined;
  }


  toggle(movie: IMovieSearchResult) {
    let favorites= this._favorites.value;

    if (this.isFavorite(movie)) {
      this._favorites.next(favorites.filter(e=> e.imdbID !== movie.imdbID));
    } else  {
      this._favorites.next([...favorites, movie]);
    }
   
  }
    

  changeFilter(value: string): void {
    this._filter.next(value);
  }
  
  query(req?: any): Observable<HttpResponse<ISearchResult>> {
    return this.http
      .get<ISearchResult>(this.resourceUrl, { params: req, observe: "response" });
  }


  findById(req: any): Observable<HttpResponse<IMovie>> {
    return this.http
      .get<IMovie>(this.resourceUrl, { params: req, observe: "response" });
  }


  search(e: any): void{
    this._filter.next(e);

  }

}
