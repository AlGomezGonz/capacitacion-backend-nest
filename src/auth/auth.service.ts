import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersService.finOne(email);

    if (!user) {
      throw new BadRequestException();
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const currentUser = await this.usersService.finOne(user.email);

    const payload = {
      user: {
        email: currentUser.email,
        name: currentUser.name,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any): Promise<Omit<User, 'password'> | undefined> {
    const hash = await bcrypt.hash(data.password, 10);

    const response = await this.usersService.create({
      ...data,
      password: hash,
    });

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = response;
      return result;
    }
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
