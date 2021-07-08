import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), LoginModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
