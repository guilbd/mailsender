import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private createGameDto: CreateGameDto) {}

  async createGame(createGameDto: CreateGameDto): Promise
}
