import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { LoginReturnDto } from './dto/login-return.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  userRepository: Repository<User>;

  constructor(dataSource: DataSource, private jwtService: JwtService) {
    this.userRepository = dataSource.getRepository(User);
  }

  async login(loginDto: LoginDto) {
    let user = await this.userRepository.findOne({
      where: {
        email: loginDto.email
      },
      select: {
        id: true,
        email: true,
        password: true
      }
    })

    if(!user) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const passwordsAreEqual = await bcrypt.compare(loginDto.password, user.password)

    if(!passwordsAreEqual) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const payload = { username: user.email, sub: user.id }
    const tokens = {
      accessToken: this.jwtService.sign(payload)
    }
    user = null;

    return new LoginReturnDto(tokens.accessToken, '');
  }
}
