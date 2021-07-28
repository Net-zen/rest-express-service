import { ArrayNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class BoardDto {
  @IsString({ message: 'Have to be string' })
  @Length(1, 150, {
    message: 'Net less then 1 symbols, and not more then 150 symbols',
  })
  title: string;

  @IsOptional()
  @ArrayNotEmpty()
  columns: string;
}
