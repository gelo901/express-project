import { Response, Request, Router } from "express";
import {videosService} from "../services";

export const videosRouter = Router({});

videosRouter.get('/', (req: Request, res: Response) => {
    const videos = videosService.getAllVideos();
    res.status(200);
    res.send(videos);
});


videosRouter.get('/:id', (req: Request, res: Response) => {
    const { id} = req.params;

    const video = videosService.getVideosById({ videoId: Number(id) })

    if (!video) {
        res.status(404);
        res.send();
    }

    res.status(200);
    res.send(video);
})


videosRouter.post('/', (req: Request, res: Response) => {
    const { title, author, availableResolutions } = req.body || {};

    if (!title || !author || !availableResolutions?.length) {
        res.status(400);
        res.send({
            errorsMessages: [
                {
                    message: "error validation",
                    field: "string"
                }
            ]
        })
    }


    videosService.postVideos({
        title,
        author,
        availableResolutions
    });

    res.status(201);
    res.send({})
});


videosRouter.put('/:id', (req: Request, res: Response) => {
    const { id: videoId} = req.params;

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;

    if (!title || !author || !availableResolutions?.length) {
        res.status(400);
        return res.send({
            errorsMessages: [
                {
                    message: "error validation",
                    field: "string"
                }
            ]
        })
    }


    const updatedVideo = videosService.updateVideoById({
        videoId,
        params: {
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate
        }
    });

    if(!updatedVideo) return;

    res.status(204);
    res.send()
})



videosRouter.delete('/:id', (req: Request, res: Response) => {
    const { id: videoId} = req.params;

    const result = videosService.deletedVideosById({ videoId })

    if (!result) {
        res.status(404);
    }

    res.status(204);
    res.send()
})