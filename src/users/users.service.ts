import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { UserRole } from './user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //endpoint para criar admin
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem'); //tentei criar um usuario mas a senha estava diferente da confirmação
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}
