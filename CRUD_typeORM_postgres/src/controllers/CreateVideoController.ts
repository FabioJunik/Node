import { Request, Response } from "express";
import { CreateVideoService } from "../services/CreateVideoService";


export class CreateVideoController {
    async handle(request: Request, response: Response,) {
        const { name, description, category_id, duration } = request.body;

        const service = new CreateVideoService();

        const result = await service.execute({
            name,
            description,
            category_id,
            duration
        });

        if (result instanceof Error)
            return response.status(400).json({ message: result.message });

        return response.json(result);
    }
}