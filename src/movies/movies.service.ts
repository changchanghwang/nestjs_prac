import { Injectable } from '@nestjs/common';

const movies = [
  { id: 1, title: 'movie1', description: 'gg' },
  { id: 2, title: 'movie2', description: 'hh' },
];

@Injectable()
export class MoviesService {
  list() {
    return movies;
  }

  retrieve(id: number) {
    return movies.filter((movie) => movie.id === id)[0];
  }

  add(title: string, description: string) {
    const newMovie = {
      id: movies[movies.length - 1].id + 1,
      title,
      description,
    };
    movies.push(newMovie);
    return newMovie;
  }

  remove(id: number) {
    return movies.filter((movie) => movie.id !== id);
  }
}
