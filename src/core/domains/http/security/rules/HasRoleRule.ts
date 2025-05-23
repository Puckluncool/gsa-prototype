
import SecurityException from "@src/core/domains/express/exceptions/SecurityException";
import HttpContext from "@src/core/domains/http/context/HttpContext";
import { SecurityEnum } from "@src/core/domains/http/enums/SecurityEnum";
import AbstractSecurityRule from "@src/core/domains/http/security/abstract/AbstractSecurityRule";

type THasRoleRuleOptions = {
    roles: string | string[];
}

class HasRoleRule extends AbstractSecurityRule<THasRoleRuleOptions> {

    protected readonly id = SecurityEnum.HAS_ROLE;

    async execute(context: HttpContext): Promise<boolean> {
        const user = context.getUser();

        if(!user) {
            return false;
        }

        const roles = this.getRuleOptions().roles;

        if(!roles) {
            throw new SecurityException('Roles are required');
        }

        const rolesArr = Array.isArray(roles) ? roles : [roles];

        if(rolesArr.length === 0) {
            throw new SecurityException('No roles provided');
        }

        return user.hasRole(rolesArr);
    }

}

export default HasRoleRule;