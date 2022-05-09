import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  async getUserProfile(@Request() req) {
    return await this.usersService.getProfile(req.user.id);
  }

  @Post('profilepicture/upload')
  async updateProfilePicture(@Request() req) {
    return await this.usersService.changeProfilePicture(req.user.id, req.body.profilePicture)
  }

  @Post("favorite")
  async updateFavorites(@Request() req) {
    return await this.usersService.updateFavorites(req.user.id, req.body.postId)
  }
}
