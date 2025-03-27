import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(
    name: string,
    username: string,
    password: string,
  ): Promise<User> {
    const existingUser: User | null = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    if (!this.isStrongPassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
      );
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = this.userRepository.create({
      name,
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  private isStrongPassword(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }
}
