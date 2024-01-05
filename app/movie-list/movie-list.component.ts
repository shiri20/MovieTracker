import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMovie, IMovieSearchResult, ISearchResult } from '../movie.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, FormsModule } from '@angular/forms';
import { Subject, combineLatest, debounceTime, map, switchMap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

})
export class MovieListComponent implements OnInit  {

  //filter$: Subject<string> ; //= new Subject<string>(); ;

  // items$: Observable<IMovieSearchResult[]> | undefined;
  // result$: Observable<ISearchResult> | undefined;


 // temp='';


  constructor(protected movieService: MovieService){
  
  }


  ngOnInit(): void {

    //  this.movieService.filter$
    //   .pipe
    //   ( 
    //     debounceTime(1000),
    //     switchMap(t=> this.movieService.query({s:this.movieService.term })),
    //     map(r=> r.body?.Search!)
    //   );




    
  }


  // search(e: any): void{
  //   this.filter$.next(e);

  // }

  onKeyPressed(e: KeyboardEvent) {

    //this.temp= e.code;
  }

}
