import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers['x-role'];  // Lấy role từ header 'X-Role'

    // Kiểm tra quyền của người dùng dựa trên role
    if (role === 'admin' || role === 'principal' || role === 'teacher') {
      return true;
    }

    return false;
  }
}
