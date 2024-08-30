import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { info } from "console";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {
        info('This action adds a new User');

        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data,
        });
    }

    async update(id: number, data: UpdateUserDTO) {
        info('This action update a User with id: ', id);

        await this.exists(id);

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
    }

    async updatePartial(id: number, data: UpdatePatchUserDTO) {
        info('This action update partialy a User with id: ', id);

        await this.exists(id);

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
    }

    async list() {
        info(`This action returns all Users`);
        return this.prisma.user.findMany();
    }

    async show(id: number) {
        info(`This action returns one User with id: `, id);
        await this.exists(id)
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async delete(id: number) {
        info(`This action delete one User with id: `, id);

        await this.exists(id);

        return this.prisma.user.delete({
            where: { id }
        });
    }

    async exists(id: number) {
        if (!await this.prisma.user.count({
            where: { id }
        })) {
            throw new NotFoundException(`This user with id ${id} not found!`);
        }
    }


}