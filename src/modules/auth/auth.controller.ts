import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReturnDto } from './dto/login-return.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto): Promise<LoginReturnDto> {
    return this.authService.login(loginDto);
  }
}
