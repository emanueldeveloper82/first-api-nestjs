import { CreateUserDTO } from '../../src/user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  name: 'Emanuel da Anunciação Silva',
  email: 'emanuel.developer82@gmail.com',
  password: '12345678',
  birth_at: new Date('1982-06-15T22:01:33.313Z'),
  role: 2,
};
