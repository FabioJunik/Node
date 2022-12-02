import { Request, Response } from "express";
import { GetAllCategoryService } from "../services/GetAllCategoryService";



export class GetAllCategoryController {

    async handle(request: Request, response: Response) {
        const service = new GetAllCategoryService();

        const allCategories = await service.execute();

        return response.json(allCategories);
    }
}