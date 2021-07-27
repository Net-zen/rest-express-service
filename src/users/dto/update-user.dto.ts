import { IsString, Length } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateUserDto {
  @IsString({ message: 'Have to be string' })
  @Column()
  name?: string;

  @IsString({ message: 'Have to be string' })
  @Column()
  login?: string;

  @IsString({ message: 'Have to be string' })
  @Length(5, 25, {
    message: 'Net less then 5 symbols, and not more then 25 symbols',
  })
  @Column()
  password?: string;
}