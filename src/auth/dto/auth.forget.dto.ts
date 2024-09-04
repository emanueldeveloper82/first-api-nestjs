import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}
