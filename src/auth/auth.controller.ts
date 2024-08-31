import { Body, Controller, Post, Get, UseGuards, Param, HttpStatus } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthForgetDTO } from "./dto/auth.forget.dto";
import { AuthResetDTO } from "./dto/auth.reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}


    @ApiOperation({ 
        summary: 'Route to perform authentication in the application.', 
        description: 'Login user' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Performs user login.',
        type: String,
    })
    @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, 
        example: {
            "message": "E-mail e/ou Senha incorreto.",
            "error": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": [
                "Error message"
            ],
            "error": "Bad Request",
            "statusCode": HttpStatus.BAD_REQUEST
        }
    })
    @Post('login')
    async login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body.email, body.password);
    }


    @ApiOperation({ 
        summary: 'Route to register in the application.', 
        description: 'Register user' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Method that registers and creates an authentication token.',
        type: String,
    })
    @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, 
        example: {
            "message": "E-mail e/ou Senha incorreto.",
            "error": "Unauthorized",
            "statusCode": HttpStatus.UNAUTHORIZED
        }
    })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": [
                "Error message"
            ],
            "error": "Bad Request",
            "statusCode": HttpStatus.BAD_REQUEST
        }
    })
    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }


    @ApiOperation({ 
        summary: 'Route to register in the application.', 
        description: 'Forget password' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Sends an email to the user who forgot their password.',
        type: String,
    })
    @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, 
        example: {
            "message": "E-mail e/ou Senha incorreto.",
            "error": "Unauthorized",
            "statusCode": HttpStatus.UNAUTHORIZED
        }
    })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": [
                "Error message"
            ],
            "error": "Bad Request",
            "statusCode": HttpStatus.BAD_REQUEST
        }
    })
    @Post('forget')
    async forget(@Body() body: AuthForgetDTO) {
        return this.authService.forget(body.email);
    }

    
    @ApiOperation({ 
        summary: 'Route to reset password in application.', 
        description: 'Reset password' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Change user password.',
        type: String,
    })
    @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, 
        example: {
            "message": "E-mail e/ou Senha incorreto.",
            "error": "Unauthorized",
            "statusCode": HttpStatus.UNAUTHORIZED
        }
    })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": [
                "Error message"
            ],
            "error": "Bad Request",
            "statusCode": HttpStatus.BAD_REQUEST
        }
    })
    @Post('reset')
    async reset(@Body() body: AuthResetDTO) {
        return this.authService.reset(body.password, body.token);
    }


    @ApiOperation({ 
        summary: 'Route that returns the user email.', 
        description: 'Return e-mail' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Returns the user email.',
        type: String,
    })
    @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, 
        example: {
            "message": "E-mail e/ou Senha incorreto.",
            "error": "Unauthorized",
            "statusCode": HttpStatus.UNAUTHORIZED
        }
    })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": [
                "Error message"
            ],
            "error": "Bad Request",
            "statusCode": HttpStatus.BAD_REQUEST
        }
    })
    @UseGuards(AuthGuard)
    @Post('me')
    whoisMe(@User('email') user) {
        return {user}
    }

}