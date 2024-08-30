import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {
    // constructor() {
    //     super();
    // }

    // set birth_at(value) {
    //     if (value) {
    //         this.birth_at = new Date(value)
    //     }
    // }

    // get birth_at() {
    //     return new Date(this.birth_at);
    // }
}