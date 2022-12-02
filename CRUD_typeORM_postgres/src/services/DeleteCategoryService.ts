import { AppDataSource } from "../database/connection";
import { Category } from "../entities/Category";



export class DeleteCategoryService {

    async execute(id: string): Promise<Category | Error> {
        const repo = AppDataSource.getRepository(Category);

        const categoryExist = await repo.findOne({
            where: { id }
        });

        if (!categoryExist)
            return new Error("Category not found");


        await repo.delete({ id })

        return categoryExist;


    }
}