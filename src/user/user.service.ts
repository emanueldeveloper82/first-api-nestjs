import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { info } from "console";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Method that registers a user;
     * @param data 
     * @returns CreateUserDTO
     */
    async create(data: CreateUserDTO) {
        info('This action adds a new User');
        try {
            const salt = await bcrypt.genSalt()
            data.password = await bcrypt.hash(data.password, salt);

            return this.prisma.user.create({
                data,
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Method that update a user;
     * @param id 
     * @param data 
     * @returns UpdateUserDTO
     */
    async update(id: number, data: UpdateUserDTO) {
        info('This action update a User with id: ', id);

        await this.exists(id);

        try {

            /** Turn a password into a hash;*/
            const salt = await bcrypt.genSalt()
            data.password = await bcrypt.hash(data.password, salt);

            /**Converts a date to a standard database format;*/
            if (data.birth_at) {
                const birthdate = new Date(data.birth_at)
                data.birth_at = birthdate
            }

            return this.prisma.user.update({
                data,
                where: {
                    id
                }
            });

        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    /**
     * Method that update partial a user;
     * @param id 
     * @param data 
     * @returns UpdatePatchUserDTO
     */
    async updatePartial(id: number, data: UpdatePatchUserDTO) {
        info('This action update partialy a User with id: ', id);

        await this.exists(id);

        try {
            /**Converts a date to a standard database format;*/
            if (data.birth_at) {
                const birthdate = new Date(data.birth_at)
                data.birth_at = birthdate
            }

            /** Turn a password into a hash;*/
            if (data.password) {
                const salt = await bcrypt.genSalt()
                data.password = await bcrypt.hash(data.password, salt);
            }

            return this.prisma.user.update({
                data,
                where: {
                    id
                }
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Method that returns a list of users;
     * @returns List[]
     */
    async list() {
        info(`This action returns all Users`);
        try {
            const listUser = await this.prisma.user.findMany();
            if (listUser.length === 0) {
                throw new NotFoundException("No users found.")
            }
            return listUser;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Method that returns a user by id;
     * @param id 
     * @returns User
     */
    async show(id: number) {
        info(`This action returns one User with id: `, id);
        await this.exists(id);

        try {
            return this.prisma.user.findUnique({
                where: { id }
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Method that remove a user;
     * @param id 
     * @returns 
     */
    async delete(id: number) {
        info(`This action delete one User with id: `, id);

        await this.exists(id);

        try {
            return this.prisma.user.delete({
                where: { id }
            });            
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Method that checks if the user exists;
     * @param id
     * @return boolean 
     */
    async exists(id: number) {
        if (!await this.prisma.user.count({
            where: { id }
        })) {
            throw new NotFoundException(`This user with id ${id} not found!`);
        }
    }


}