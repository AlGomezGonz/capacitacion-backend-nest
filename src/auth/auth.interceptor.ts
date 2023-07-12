import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const tokenArray = req.headers.authorization;

    if (tokenArray) {
      const request = this.authService.decodeToken(tokenArray.split(' ')[1]);
      if (!request) {
        return next.handle();
      }

      req.body['user'] = (request as { user: User }).user;
    }

    return next.handle().pipe();
  }
}
