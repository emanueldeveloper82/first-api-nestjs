import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class AuthMeDTO {

    @ApiProperty()
    @IsJWT()
    token: string;

}