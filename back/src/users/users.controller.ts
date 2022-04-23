import { Controller, Get, Param, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthenticationGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updatePostById(@UploadedFile() file: Express.Multer.File, @Param('id') userId: string) {
    return "Pas encore implémenté"
  }

}
