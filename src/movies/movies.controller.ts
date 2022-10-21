import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dot';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  list() {
    return this.movieService.list();
  }

  @Get('/search')
  search(@Query('year') year: string) {
    return `${year}`;
  }

  @Get('/:id')
  retrieve(@Param('id') id: number) {
    return this.movieService.retrieve(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.add(movieData);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.movieService.remove(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update({ id: id, updateData });
  }
}
