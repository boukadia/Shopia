import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,private jwtService:JwtService ) {}

  async register(data: RegisterDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error('User is already registered with this email');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    
    const user = await this.prisma.user.create(
      {
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      }
    );
    const { password:_, ...result } = user;
    return result;
  }
  async login(data: LoginDto): Promise<User>{
    const user = await this.prisma.user.findUnique({
      where:{email:data.email}
    })
    if(!user){
      throw new Error('invalid credentials');
    }
    const isPasswordValid=await bcrypt.compare(data.password,user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('mots du passe incorrecte');
      
    }
    const payload={
      sub:user.id,
      email:user.email,
      role:user.role
    };
     return {
      access_token: this.jwtService.sign(payload),
    };

     

  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
