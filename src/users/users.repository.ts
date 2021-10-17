import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create(); //chamando a entity

    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex'); //gera um token
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save(); // assim que salva no banco
      delete user.password; //para não aparecer o password no retorno
      delete user.salt; // para não aparecer o numero de saltos no retorno
      delete user.confirmationToken;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de e-mail já está em uso'); //sei que é o email que está errado pq o unico Unique na entity é email
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
