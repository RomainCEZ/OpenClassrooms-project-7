import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ResetPasswordDto } from './dto/RestPasswordDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Post('requestpasswordreset')
  async requestpasswordreset(@Body("email") email: string) {
    await this.authService.sendPasswordRestEmail(email)
    return "Un email re réinitialisation a été envoyé à cette adresse."
  }

  @Post('resetpassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto)
  }
}
