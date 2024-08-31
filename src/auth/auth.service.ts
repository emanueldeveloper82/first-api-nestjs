import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { link } from "fs";


@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';
    private expiresIn = "30 minutes";

    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) { }

    /**
     * Method that creates an authentication token;
     * @param user 
     * @returns string
     */
    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                {
                    subject: String(user.id),
                    expiresIn: this.expiresIn,
                    audience: this.audience,
                    issuer: this.issuer,
                }
            )
        }
    }

    /**
     * This method is used to check whether the token is valid;
     * @param token 
     * @returns string
     */
    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(
                token,
                {
                    audience: this.audience,
                    issuer: this.issuer,
                }
            );
            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * This method validates token is authentic;
     * @param token 
     * @returns boolean
     */
    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Performs user login;
     * @param email 
     * @param password 
     * @returns String
     */
    async login(email: string, password: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou Senha incorreto.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou Senha incorreto.');
        }

        return this.createToken(user);
    }

    /**
     * Sends an email to the user who forgot their password;
     * @param email 
     * @returns Boolean
     */
    async forget(email: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail não encontrado ou incorreto.');
        }

        const token = this.jwtService.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            {
                subject: String(user.id),
                expiresIn: this.expiresIn,
                audience: 'forget',
                issuer: 'user',
            }
        )

        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to: user.email,
            template: 'forgetPasswordMessage',
            context: {
                name: user.name,
                token
            }
        });

        return {message: "ok"};
    }

    /**
     * Change user password;
     * @param password 
     * @param token 
     * @returns Boolean
     */
    async reset(password: string, token: string) {
        try {
            const data =  this.jwtService.verify(
                token, 
                {
                    audience: 'forget'
                }
            );

            if (isNaN(Number(data.id))) {
                throw new BadRequestException("Token inválido.");
            }

            const salt = await bcrypt.genSalt()
            password = await bcrypt.hash(password, salt);

            const user = await this.prismaService.user.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    password, 
                }
            })
            return this.createToken(user);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    /**
     * Method that registers and creates an authentication token;
     * @param data 
     * @returns string
     */
    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user)
    }

}