import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';

import { LocalAuthGuard } from './guard/localAuth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
