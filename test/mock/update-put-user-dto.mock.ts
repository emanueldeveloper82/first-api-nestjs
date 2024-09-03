import { Role } from "../../src/enums/role.enum";
import { UpdateUserDTO } from "../../src/user/dto/update-user.dto";


export const updatePutUserDTO: UpdateUserDTO = {
    name: 'Emanuel da Anunciação Silva',
    email: 'emanuel.developer82@gmail.com',
    password: '12345678',
    birth_at: new Date('1982-06-15T22:01:33.313Z'),
    role: Role.Admin,
};