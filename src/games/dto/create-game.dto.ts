import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @MaxLength(200, {
    message: 'O nome do jogo deve conter no máximo 200 caracteres',
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(400, {
    message: 'A descrição do jogo deve conter no máximo 400 caracteres',
  })
  bio: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  publish: string;
}
