import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { User } from '../users/users.entity';
import { UserRole } from 'src/users/user-roles.enum';
import { CredentialsDto } from './credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService, // preciso injetar o JwtService para poder utilizá-lo
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem'); //tentei criar um usuario mas a senha estava diferente da confirmação
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    //se retornar nulo da função checkCredentials
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };

    //criação do token
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }
}
