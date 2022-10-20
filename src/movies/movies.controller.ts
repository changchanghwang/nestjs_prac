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
  retrieve(@Param('id') id: string) {
    return this.movieService.retrieve(Number(id));
  }

  @Post()
  create(@Body() title: string, description: string) {
    return this.movieService.add(title, description);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.movieService.remove(Number(id));
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() title?: string,
    description?: string,
  ) {
    return `${id} changed with ${title}, ${description}`;
  }
}
