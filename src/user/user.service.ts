import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { info } from 'console';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Method that registers a user;
   * @param data
   * @returns CreateUserDTO
   */
  async create(data: CreateUserDTO) {
    info('This action adds a new User');

    await this.existsWithEmail(data.email);
    try {
      /**Converts a date to a standard database format;*/
      data.birth_at = this.checkBirthAt(data.birth_at);
      /** Turn a password into a hash;*/
      data.password = await this.generateCryptPassword(data.password);
      /**Transform the role field into a number */
      data.role = Number(data.role);

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
      data.password = await this.generateCryptPassword(data.password);
      /**Transform the role field into a number */
      data.role = Number(data.role);
      /**Converts a date to a standard database format;*/
      data.birth_at = this.checkBirthAt(data.birth_at);

      return this.prisma.user.update({
        data,
        where: {
          id,
        },
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
      data.birth_at = this.checkBirthAt(data.birth_at);

      /**Transform the role field into a number */
      if (data.role) {
        data.role = Number(data.role);
      }

      /** Turn a password into a hash;*/
      if (data.password) {
        data.password = await this.generateCryptPassword(data.password);
      }

      return this.prisma.user.update({
        data,
        where: {
          id,
        },
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
        throw new NotFoundException('No users found.');
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
        where: { id },
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
        where: { id },
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
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`This user with id ${id} not found!`);
    }
  }

  /**
   * Method that checks if the user exists via e-mail;
   * @param email
   * @return boolean
   */
  async existsWithEmail(email: string) {
    const userExists = await this.prisma.user.count({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(
        `This user with email ${email} already exists!`,
      );
    }
  }

  /**
   * This method adjusts the birth date to the correct type.
   * @param birth_at
   * @returns
   */
  checkBirthAt(birth_at: Date) {
    if (birth_at) {
      return new Date(birth_at);
    }
  }

  /**
   * This method generates an encrypted password.
   * @param password
   * @returns string
   */
  async generateCryptPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      return password;
    }
  }
}
