import { Board } from '../entities/board.entity';

export type BoardDto = Omit<Board, 'id'>;
