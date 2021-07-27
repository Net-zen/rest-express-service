import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString({ message: 'Have to be string' })
  login: string;

  @IsString({ message: 'Have to be string' })
  @Length(6, 25, {
    message: 'Net less then 6 symbols, and not more then 25 symbols',
  })
  password: string;
}
