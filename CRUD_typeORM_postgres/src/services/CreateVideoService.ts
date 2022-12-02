import { AppDataSource } from "../database/connection";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";


type VideoRequest = {
    name: string;
    description: string;
    duration: number;
    category_id: string;
}


export class CreateVideoService {
    async execute({ name, description, category_id, duration }: VideoRequest): Promise<Video | Error> {
        const repoVideo = AppDataSource.getRepository(Video);
        const repoCategory = AppDataSource.getRepository(Category);

        const categoryExists = await repoCategory.findOne({ where: { id: category_id } });

        if (!categoryExists) {
            return new Error("Category does not exists");
        }

        const video = repoVideo.create({
            name,
            description,
            duration,
            category_id
        });

        await repoVideo.save(video);

        return video;

    }
}