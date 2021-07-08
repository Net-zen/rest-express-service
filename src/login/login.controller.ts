import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  login(@Body() user: UserDto) {
    return this.loginService.login(user);
  }
}
