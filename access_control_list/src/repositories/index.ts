import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Permission } from "../entities/Permission";
import { AppDataSource } from "../database/connection";

export const UserRepository = () => {
  return AppDataSource.getRepository(User);
};

export const RoleRepository = () => {
  return AppDataSource.getRepository(Role);
};

export const PermissionRepository = () => {
  return AppDataSource.getRepository(Permission);
};

export const ProductRepository = () => {
  return AppDataSource.getRepository(Product);
};
