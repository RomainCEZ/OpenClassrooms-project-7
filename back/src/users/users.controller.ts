import { Controller, Get, UseGuards, Post, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthenticationGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  async getUserProfile(@Request() req) {
    return await this.usersService.findById(req.user.id);
  }

  @Post('profilepicture')
  @UseInterceptors(FileInterceptor('file'))
  async updatePostById(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.usersService.changeProfilePicture(req.user.id, file.filename)
  }

}
