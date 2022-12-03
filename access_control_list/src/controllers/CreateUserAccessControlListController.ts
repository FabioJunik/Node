import { Request, Response } from "express";
import { CreateUserAccessControlListService } from "../services/CreateUserAccessControlListService";

export class CreateUserAccessControlListController {
    async handle(request: Request, response: Response) {
        const { permission, role } = request.body;
        const { userId } = request;

        const createUserAccessControlListService = new CreateUserAccessControlListService();

        const result = await createUserAccessControlListService.execute({
            userId,
            permission,
            role
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
