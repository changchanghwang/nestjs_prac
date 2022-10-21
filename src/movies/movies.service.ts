import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  list() {
    return this.movies;
  }

  retrieve(id: number) {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with Id(${id}) is not exist.`);
    }
    return movie;
  }

  add({
    title,
    genres,
    year,
  }: {
    title: string;
    genres: string[];
    year: string;
  }) {
    const newMovie = new Movie({
      id: this.movies.length ? this.movies[this.movies.length - 1].id + 1 : 1,
      title,
      genres,
      year,
    });
    this.movies.push(newMovie);
    return newMovie;
  }

  remove(id: number) {
    this.retrieve(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return this.movies;
  }

  update({
    id,
    title,
    year,
    genres,
  }: {
    id: number;
    title?: string;
    year?: string;
    genres?: string[];
  }) {
    this.retrieve(id);
    const movie = this.movies.find((movie) => movie.id === id);
    this.remove(id);
    const updatedMovie = Object.assign(
      movie,
      stripUndefined({ title, year, genres }),
    );
    this.movies.push(updatedMovie);
    this.movies.sort((a, b) => a.id - b.id);
    return this.movies;
  }
}

function stripUndefined(obj: { [key: string]: any }) {
  const stripped = Object.keys(obj).reduce(
    (acc: { [key: string]: any }, prop) => {
      if (obj[prop] !== undefined) {
        acc[prop] = obj[prop];
      }
      return acc;
    },
    {},
  );
  if (Object.keys(stripped).length === 0) {
    return undefined;
  }
  return stripped;
}
