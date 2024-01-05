import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMovie } from '../movie.model';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, mergeMap, of, switchMap, tap, toArray } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie$: Observable<IMovie | null> | undefined;

  movie?: IMovie | null;

  numbers= [1,2,3,4,5,6];

  // id!: string;

  subscription?: Subscription;



constructor(protected movieService: MovieService, protected activatedRoute: ActivatedRoute ) {
   ;
}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

ngOnInit(): void {
  // this.activatedRoute.paramMap.subscribe(p => {
  //   //const id= p!.params!.id;
  //   this.id = p.get('id')!;
   
  //   console.log(p);
  // });

  of(this.numbers)
  .pipe(
    tap( n=> console.log(n)),


    tap( n=> console.log(n)),
    )

  .subscribe();

  this.movie$= this.activatedRoute
    .paramMap
    .pipe(
        tap(p=> console.log(p.get('id'))),
    //    tap(p=> console.log(p)),
        switchMap(p => 
          this.movieService.findById( {i: p.get('id')} )
          .pipe(map(r=>r.body))
        )
  );


   this.subscription= this.activatedRoute
    .paramMap
    .pipe(
        tap(p=> console.log(p.get('id'))),
    //    tap(p=> console.log(p)),
        switchMap(p => 
          this.movieService.findById( {i: p.get('id')} )
          .pipe(map(r=>r.body))
        )

  ).subscribe( x => this.movie= x);



  this.activatedRoute
  .queryParamMap
  .pipe(
      tap(p=> console.log(p.get('genre')))
      ).subscribe()
;

}




}
