import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Hello')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation(
    { summary: 'Route Hello.', 
      description: 'Hello World!' 
    }
  )
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Hello World!.',
    example: {"message":"Hello World!"},
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @ApiOperation(
    { summary: 'Route Hello stranger.', 
      description: 'Hello stranger!' 
    }
  )
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Hello stranger!.',
    example: {"message":"Hello stranger!"},
  })
  @Post()
  setHello(): string {
    return 'POST: Hello stranger!';
  }
}
