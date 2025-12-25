// import { PartialType } from '@nestjs/mapped-types';

import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  name: string;
}
