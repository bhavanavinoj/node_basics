import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service'; 
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService, 
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ name: dto.name, email: dto.email, password: hashed });
    await this.repo.save(user);

    await this.mailService.sendRegistrationEmail(dto.email, dto.name);

    return { message: 'Registration successful' };
  }

  // login
  async login(dto: LoginDto) {
    const user = await this.repo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid email');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = { id: user.id, email: user.email };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user: { name: user.name, email: user.email },
    };
  }
}