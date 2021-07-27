import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    forwardRef(() => LoginModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
