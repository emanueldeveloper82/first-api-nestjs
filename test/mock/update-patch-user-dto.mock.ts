import { Role } from '../../src/enums/role.enum';
import { UpdatePatchUserDTO } from '../../src/user/dto/update-patch-user.dto';

export const updatePatchUserDTO: UpdatePatchUserDTO = {
  role: Role.Admin,
};
