import { Permission } from "../entities/Permission";
import { PermissionRepository } from "../repositories";

type PermissionRequest = {
    name: string;
    description: string;
}

export class CreatePermissionService {

    async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {
        const repo = PermissionRepository();

        const permissionFound = await repo.findOne({ where: { name } });

        if (!name || !description) {
            return new Error("Name and description are request");
        }

        if (permissionFound)
            return new Error("Permission already exists");


        const permission = repo.create({ name, description })

        await repo.save(permission);

        return permission;
    }
}