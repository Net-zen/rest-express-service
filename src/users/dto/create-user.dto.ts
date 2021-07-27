import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Have to be string' })
  name: string;

  @IsString({ message: 'Have to be string' })
  login: string;

  @IsString({ message: 'Have to be string' })
  @Length(5, 25, {
    message: 'Net less then 5 symbols, and not more then 25 symbols',
  })
  password: string;
}
