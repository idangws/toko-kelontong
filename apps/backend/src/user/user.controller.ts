import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: { name: string; username: string; password: string }) {
    return this.userService.createUser(body.name, body.username, body.password);
  }
}
