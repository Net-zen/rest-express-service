import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Wrong authenticate scheme!',
      });
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException({
        message: 'Wrong authenticate scheme!',
      });
    }
    if (!token) {
      throw new UnauthorizedException({
        message: 'Failed to authenticate token',
      });
    }
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
