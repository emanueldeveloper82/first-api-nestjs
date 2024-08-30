import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log('Before Check Middleware')

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            console.log('Check Middleware')
            throw new BadRequestException('Invalid Id!')
        }
        console.log('After Check Middleware')
        next();
    }

}