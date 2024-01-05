export interface ISearchResult {
   Search: IMovieSearchResult[];
   TotalResults: number;
   Response: boolean;
}

export interface IMovieSearchResult {
   Title: string;
   Year: number;
   imdbID: string;
   Type: string;
   Poster: string;
   Favorite: boolean;
}

export interface IMovie {
   Title: string;
   Year: number;
   Poster: string;
   Genre: string,
   Director: string,
   Actors: string
   Favorite: boolean;
}