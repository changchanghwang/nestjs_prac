import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly year: string;

  @IsString({ each: true })
  readonly genres: string[];
}
