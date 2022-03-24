import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.createUser(createUserDto);
    return 'Utilisateur enregistré !'
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(SessionGuard)
  @Get('test')
  async test() {
    return
  }

  @Post('logout')
  async logout() {
    'logout'
  }
}
