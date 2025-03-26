import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

interface JwtPayload {
  user_id: number;
  name: string;
  username: string;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    const payload = {
      user_id: user.id,
      username: user.username,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);

      return {
        id: decoded.user_id,
        name: decoded.name,
        username: decoded.username,
        exp: decoded.exp,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
