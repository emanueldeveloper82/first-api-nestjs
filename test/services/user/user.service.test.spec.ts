import { Test, TestingModule } from '@nestjs/testing';
// import { userList } from '../../../test/mock/user-list.mock';
// import { createUserDTO } from '../../../test/mock/create-user-dto.mock';
// import { updatePutUserDTO } from '../../../test/mock/update-put-user-dto.mock';
// import { updatePatchUserDTO } from '../../../test/mock/update-patch-user-dto.mock';
import { userRepositoryMock } from '../../../test/mock/user-prisma-mock';
// import { userServiceMock } from '../../../test/mock/user-service.mock';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { UserService } from '../../../src/user/user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
  });

  // describe('Create', () => {
  //   test('method create', async () => {

  //     jest.spyOn(userRepositoryMock.useValue, 'existsWithEmail').mockResolvedValueOnce(true);

  //     const result = await userService.create(createUserDTO);
  //     expect(result.name).toEqual(userList[2].name);
  //   });
  // });

  // describe('Read', () => {
  //   test('method list', async () => {
  //     const result = (await userService.list());
  //     const item = result.find(i => i.id === 2);
  //     expect(item.name).toEqual(userList[2].name);
  //   });

  //   test('method show', async () => {
  //     const result = await userService.show(2);

  //     expect(result.name).toEqual(userList[2].name);
  //   });
  // });

  // describe('Update', () => {

  //   test('method update', async () => {
  //     const result = await userService.update(2, updatePutUserDTO);

  //     expect(result.name).toEqual(userList[2].name);
  //   });

  //   test('method updatePartial', async () => {
  //     const result = await userService.updatePartial(2, updatePatchUserDTO);

  //     expect(result.role).toEqual(userList[2].role);
  //   });
  // });

  // describe('Delete', () => {

  //   test('method delete', async () => {
  //     const result =  userService.delete(1000);
  //     //TODO: Verificar esse teste.
  //     //expect(result).toThrow(new NotFoundException('This user with id 1000 not found!'))
  //   })

  // });
});
