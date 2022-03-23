export interface FilmsData {
    id: number;
    title: string;
    poster_path: string;
}
export interface FilmDescription {
    production_countries: [{id?: number, name: string}];
    release_date: string;
    runtime: number;
    genres: number[];
    overview: string;
    budget: number;
}
export interface CinemaFilms {
    title: string;
    id: number;
}
