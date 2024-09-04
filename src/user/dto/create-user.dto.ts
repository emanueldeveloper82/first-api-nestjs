import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 0,
    minUppercase: 0,
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birth_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  @Type(() => Number)
  role: number;
}
