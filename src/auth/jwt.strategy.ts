import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common'; //Injectable para usar o repository pois ele que vai bater no banco de dados. Referente ao NestJs.
import { InjectRepository } from '@nestjs/typeorm'; //Ele é diferente do Injectable, esse é referente ao Typeorm
