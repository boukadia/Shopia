import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    const usersSansPassword = users.map(({ password, ...rest }) => rest);
    return usersSansPassword;
  }

  async findOne(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return null;
    }
    const { password, ...rest } = user;

    return rest;
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user=this.prisma.user.update({
      where: {id: id},
      data:{
        ...updateUserDto
      }
    })
    return user;
  }

  remove(id: number): Promise<User> {
    const user=this.prisma.user.delete({where:{id:id}})

    return user;
  }
}
