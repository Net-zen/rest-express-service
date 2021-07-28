import { IsString, Length } from 'class-validator';

export class BoardDto {
  @IsString({ message: 'Have to be string' })
  @Length(1, 250, {
    message: 'Net less then 1 symbols, and not more then 25 symbols',
  })
  title: string;

  columns: string;
}
