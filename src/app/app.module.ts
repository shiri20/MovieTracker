import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailComponent,
    AboutComponent,
    FavoriteMoviesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot([
      {path: 'movie-list', component: MovieListComponent},      
      {path: 'movie-favorites', component: FavoriteMoviesComponent},
      {path: 'movie-detail/:id', component: MovieDetailComponent },
      {path: 'about', component: AboutComponent}
    ])
    
  ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }