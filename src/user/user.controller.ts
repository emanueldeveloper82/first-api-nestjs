import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Route to register users.', description: 'Create user' })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The record has been successfully created.',
        type: CreateUserDTO,
      })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
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
    @Post()
    async create(@Body() { name, email, password, role }: CreateUserDTO) {
        return this.userService.create({ name, email, password, role });
    }


    @ApiOperation({ 
        summary: 'Route to returns a list of users.', 
        description: 'List all user' 
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'This action returns all Users.',
        example: 
            [{
                "id": 0,
                "name": "string",
                "email": "string",
                "password": "string",
                "birth_at": "2024-08-30T22:01:33.313Z",
                "role": 0,
                "create_at": "2024-08-30T22:01:33.313Z",
                "update_at": "2024-08-30T22:01:33.313Z"
            }]
    
    })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
        }
    })
    @ApiNotFoundResponse({
        example: {
            "response": {
                "message": "No users found.",
                "error": "Not Found",
                "statusCode": HttpStatus.NOT_FOUND
            },
            "status": HttpStatus.NOT_FOUND,
            "options": {},
            "message": "No users found.",
            "name": "NotFoundException"
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
    @Get()
    async list() {
        return this.userService.list();
    }


    @ApiOperation({ summary: 'Route to returns a user.', 
        description: 'Get user by Id' })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'This action returns one User with id.',
        example: 
            {
                "id": 0,
                "name": "string",
                "email": "string",
                "password": "string",
                "birth_at": "2024-08-30T22:01:33.313Z",
                "role": 0,
                "create_at": "2024-08-30T22:01:33.313Z",
                "update_at": "2024-08-30T22:01:33.313Z"
            }
      })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
        }
    })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, 
        example: {
            "message": "This user with id 99 not found!",
	        "error": "Not Found",
	        "statusCode": HttpStatus.NOT_FOUND
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
    @Get(':id')
    async show(@ParamId() id: number) {
        return this.userService.show(id);
    }


    @ApiOperation({ summary: 'Route to update users.', description: 'Update user' })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'This action update a User with id.',
        type: UpdateUserDTO,
      })
    @ApiForbiddenResponse({ status: HttpStatus.BAD_REQUEST, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
        }
    })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, 
        example: {
            "message": "This user with id 99 not found!",
	        "error": "Not Found",
	        "statusCode": HttpStatus.NOT_FOUND
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
    @Put(':id')
    async update(@Body() body: UpdateUserDTO,
        @ParamId() id: number) {
        return this.userService.update(id, body)
    }


    @ApiOperation({ summary: 'Route to update partial a user.', 
        description: 'Update partial user' })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'This action update partialy a User with id.',
        type: UpdateUserDTO,
      })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
        }
    })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, 
        example: {
            "message": "This user with id 99 not found!",
	        "error": "Not Found",
	        "statusCode": HttpStatus.NOT_FOUND
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
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO,
                        @ParamId() id: number) {
        return this.userService.updatePartial(id, data)
    }


    @ApiOperation({ summary: 'Route to remove a user.', 
        description: 'Remove user' })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'This action delete one User with id.',
        type: UpdateUserDTO,
      })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, 
        example: {
            "message": "Forbidden resource",
            "error": "Forbidden",
            "statusCode": HttpStatus.FORBIDDEN
        }
    })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, 
        example: {
            "message": "This user with id 99 not found!",
	        "error": "Not Found",
	        "statusCode": HttpStatus.NOT_FOUND
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
    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }



}