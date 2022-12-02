import { AppDataSource } from "../database/connection";
import { Video } from "../entities/Video";



export class GetAllVideoService {

    async execute(): Promise<Video[]> {
        const repo = AppDataSource.getRepository(Video);

        const allVideos = await repo.find({
            relations: ['category']
        });

        return allVideos;
    }
}