import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";


export class CreateUserDTO {
    
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minSymbols: 0,
        minNumbers: 0,
        minUppercase: 0
    })
    password: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    birth_at?: Date;

    @IsOptional()
    @IsEnum(Role)
    role: number;

}
