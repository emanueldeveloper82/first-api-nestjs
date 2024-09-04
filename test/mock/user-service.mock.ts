import { UserService } from '../../src/user/user.service';
import { userList } from './user-list.mock';
import { userMock } from './user.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(userMock),
    create: jest.fn().mockResolvedValue(userMock),
    list: jest.fn().mockResolvedValue(userList),
    update: jest.fn().mockResolvedValue(userMock),
    updatePartial: jest.fn().mockResolvedValue(userMock),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
