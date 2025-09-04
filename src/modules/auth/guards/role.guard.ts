import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/common/enums/role.enums'
import { ROLES_KEY } from 'src/decorators/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        )

        if (!requiredRoles || requiredRoles.length === 0) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        if (!user) {
            throw new ForbiddenException('User not authenticated')
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Unauthorized Access')
        }

        return true
    }
}
