import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticationGuard } from './guard/authentication.guard';

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

  @UseGuards(AuthenticationGuard)
  @Post('')
  async relog(@Request() req) {
    if (req.user) {
      return req.user
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    req.logout()
  }
}
