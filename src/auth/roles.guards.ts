import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'node_modules/rxjs/dist/types';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(), //handler pega se é user ou admin
    );

    if (!requiredRole) return true; // se não for ele barra
    return userRole === requiredRole;
  }
}
