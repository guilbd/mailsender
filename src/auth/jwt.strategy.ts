import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'; //Injectable para usar o repository pois ele que vai bater no banco de dados. Referente ao NestJs.
import { InjectRepository } from '@nestjs/typeorm'; //Ele é diferente do Injectable, esse é referente ao Typeorm
import { UserRepository } from 'src/users/users.repository';

@Injectable() //para usar em outros lugares
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const user = await this.userRepository.findOne(id, {
      select: ['name', 'email', 'status', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }
}
