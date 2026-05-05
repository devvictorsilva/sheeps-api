import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReturnDto } from './dto/login-return.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
    description: 'Endpoint to user login in the app',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Login successful',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ckBzaGVlcHMuY29tIiwic3ViIjoxLCJpYXQiOjE3Nzc5NjY2MDgsImV4cCI6MTc3ODA1MzAwOH0.K64FxoaPqsIhUy6HoW8U1rGqHe0nJ0sN9PHUZGpIB02',
      refreshToken: 'ishafduiaflhdsjifhpas9udfp9a7sdyufioaiçdsjfho7'
    }})
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: { message: 'Email ou senha inválidos' }
  })
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  create(@Body() loginDto: LoginDto): Promise<LoginReturnDto> {
    return this.authService.login(loginDto);
  }
}
