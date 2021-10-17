import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { User } from '../users/users.entity';
import { UserRole } from 'src/users/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem'); //tentei criar um usuario mas a senha estava diferente da confirmação
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }
}
