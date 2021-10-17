import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/users.entity';

export const GetUser = createParamDecorator((data, req): User => {
  const user = req.args[0].user; //user sempre está na posição 0 da requisição
  return user;
});
