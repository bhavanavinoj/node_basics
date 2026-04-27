import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Admin } from '../admin/admin.entity';

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

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // USER REGISTER
  async register(dto: RegisterDto) {
    const existing = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: 'user',
    });

    await this.repo.save(user);

    await this.mailService.sendRegistrationEmail(dto.email, dto.name);

    return {
      message: 'Registration successful',
    };
  }

  // USER LOGIN
  async login(dto: LoginDto) {
    // block admins from normal login
    const adminExists = await this.adminRepo.findOne({
      where: { email: dto.email },
    });

    console.log('USER LOGIN HIT');
    console.log('Admin check:', adminExists);

    if (adminExists) {
      throw new UnauthorizedException('Use admin login');
    }

    // normal user login
    const user = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ADMIN LOGIN
  async adminLogin(dto: LoginDto) {

 console.log("DTO:", dto);

 const admin = await this.adminRepo.findOne({
   where: { email: dto.email }
 });

 console.log("ADMIN:", admin);

 if (!admin) {
   throw new UnauthorizedException("Admin not found");
 }

 const isMatch = await bcrypt.compare(
   dto.password,
   admin.password
 );

 console.log("MATCH:", isMatch);

 if (!isMatch) {
   throw new UnauthorizedException("Invalid password");
 }

 const payload = {
   id: admin.id,
   email: admin.email,
   role: "admin"
 };

 return {
   access_token: this.jwtService.sign(payload)
 };
}

  // SEED ADMIN
  async createAdmin() {
    const existing = await this.adminRepo.findOne({
      where: {
        email: 'admin@gmail.com',
      },
    });

    if (existing) {
      return {
        message: 'Admin already exists',
      };
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = this.adminRepo.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
    });

    await this.adminRepo.save(admin);

    return {
      message: 'Admin created successfully',
    };
  }
}
