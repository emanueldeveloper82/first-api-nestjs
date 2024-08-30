import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}
    
    async canActivate(context: ExecutionContext) {

        const requeridRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requeridRoles) {
            return true;
        }

        console.log({requeridRoles});
        
        const {user} = context.switchToHttp().getRequest();

        const rolesFilted = requeridRoles.filter(role => role === user.role);


        return rolesFilted > 0;

        //console.log({requeridRoles, user});
        //return true;
    }

}