export interface filmsCollect extends Request {
    id: number;
    title: string;
    poster_path: string;
}
export interface filmsOneInf extends Request {
    production_countries: [{id: number, name: string}];
     release_date: string;
     runtime: number;
      genres: number[];
      overview: string,
      budget: number
}
