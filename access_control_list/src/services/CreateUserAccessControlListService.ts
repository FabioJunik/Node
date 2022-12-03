import { ArrayContains } from "typeorm";
import { User } from "../entities/User";
import { PermissionRepository, RoleRepository, UserRepository } from "../repositories";


type UserACLRequest = {
    userId: string;
    role: string[];
    permission: string[];
}

export class CreateUserAccessControlListService {
    async execute({ userId, role, permission }: UserACLRequest): Promise<User | Error> {

        const repo = UserRepository();

        const user = await repo.findOne({ where: { id: userId } })

        if (!user) {
            return new Error("User does not exist!");
        }

        const permissionsExistis = await PermissionRepository().findByIds(permission);

        const rolesExistis = await RoleRepository().findByIds(role);

        user.permissions = permissionsExistis;
        user.roles = rolesExistis;

        await repo.save(user);

        return user;
    }
}