import { Request, Response } from "express";
import { GetAllVideoService } from "../services/GetAllVideoService";



export class GetAllVideoController {

    async handle(request: Request, response: Response) {
        const service = new GetAllVideoService();

        const allVideos = await service.execute();

        return response.json(allVideos);
    }
}