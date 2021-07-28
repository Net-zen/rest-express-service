import { IsInt, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class TaskDto {
  @IsString({ message: 'Have to be string' })
  @Length(1, 150, {
    message: 'Net less then 1 symbols, and not more then 150 symbols',
  })
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  boardId: string;
}
