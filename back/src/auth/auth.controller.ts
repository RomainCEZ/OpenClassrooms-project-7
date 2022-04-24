import { Controller, Post, Body, UseGuards, Request, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ResetPasswordDto } from './dto/RestPasswordDto';
import { ChangePasswordDto } from './dto/ChangePasswordDto';

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

  @UseGuards(AuthenticationGuard)
  @Patch('changepassword')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    await this.authService.changePassword(req.user.id, changePasswordDto)
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

  @UseGuards(AuthenticationGuard)
  @Delete('disableaccount')
  async disableAccount(@Request() req) {
    await this.authService.disableAccount(req.user.id);
  }
}
