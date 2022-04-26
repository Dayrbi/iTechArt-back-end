export interface FilmsData {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number[];
}
export interface FilmDescription {
    production_countries: [{id?: number, name: string}];
    release_date: string;
    runtime: number;
    genres: number[];
    overview: string;
    budget: number;
    title: string;
    poster_path: string;
    actors: string[];
}
export interface CinemaFilms {
    title: string;
    id: number;
}
export interface FilmInfoForCheckout {
    title: string,
    poster_path: string;
}
