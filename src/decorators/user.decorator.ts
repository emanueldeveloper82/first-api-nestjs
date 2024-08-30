import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User  = createParamDecorator((_filter: string, context: ExecutionContext) => {
    
    const request = context.switchToHttp().getRequest();

    if (request.user) {

        if (_filter) {
            return request.user[_filter];    
        }
        return request.user;
    } else {
        throw new NotFoundException("Usuário não encontrado no request. Utilize o AuthGuard para obter usuário.")
    }
});