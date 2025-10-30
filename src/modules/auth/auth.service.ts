import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });

    if (!user) {
      throw new NotFoundException("Email não cadastrado");
    }

    const isMatch = await bcrypt.compare(signInDto.password.trim(), user.password.trim());

    if (!isMatch) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
