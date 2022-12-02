import { AppDataSource } from "../database/connection";
import { Category } from "../entities/Category";



export class GetAllCategoryService {

    async execute(): Promise<Category[]> {
        const repo = AppDataSource.getRepository(Category);

        const allCategories = await repo.find();

        return allCategories;
    }
}