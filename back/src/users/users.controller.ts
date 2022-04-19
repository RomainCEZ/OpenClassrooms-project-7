import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByEmail(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
