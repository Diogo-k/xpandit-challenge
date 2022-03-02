export interface Movie {
  readonly id: string;
  readonly title: string;
  readonly rank: number;
  readonly year: number;
  readonly revenue: number;
}

export interface MovieDetail {
  readonly id: string;
  readonly title: string;
  readonly rank: number;
  readonly year: number;
  readonly revenue: number;
  readonly genre: string;
  readonly description: string;
  readonly director: string;
  readonly actors: string;
  readonly runtime: number;
  readonly rating: number;
  readonly votes: number;
  readonly metascore: number;
}
