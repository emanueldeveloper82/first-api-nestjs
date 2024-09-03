import { Prisma } from "@prisma/client";
import { userMock } from "./user.mock";
import { userList } from "./user-list.mock";
import { PrismaService } from "../../src/prisma/prisma.service";


export const userRepositoryMock = {
    provide: PrismaService,
    useValue: {
      exist: jest.fn().mockResolvedValue(true),
      existsWithEmail: jest.fn().mockResolvedValue(true),
      create: jest.fn(),
      save: jest.fn().mockResolvedValue(userMock),
      find: jest.fn().mockResolvedValue(userList),
      findOneBy: jest.fn().mockResolvedValue(userList[2]),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };