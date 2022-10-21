import { IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly year: string;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
