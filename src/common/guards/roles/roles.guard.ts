import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { role } from 'src/common/guards/role';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<typeof role>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    if(!token)
      return false;
    for (let i = 0; i < roles.length; i++) {
      if (token.includes(roles[i])) {
        return true;
      }
    }
    return false;
  }
}
