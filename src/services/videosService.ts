import { VideosModel } from "../data/models";

export const videosService = {
    getAllVideos: () => {
        return VideosModel.list;
    },
    getVideosById: ({ videoId }: any) => {
        if(!videoId) {
            return null;
        }
        return VideosModel.list.find((video) => video.id === Number(videoId));
    },
    postVideos: ({ title, author, availableResolutions }: any) => {

        const videoWithMaxId = VideosModel.list.reduce((maxVideo, currentVideo) => {
            if (currentVideo.id > maxVideo.id) {
                return currentVideo;
            }
            return maxVideo;
        });
        const newVideo = {
            id: videoWithMaxId.id + 1,
            title,
            author,
            availableResolutions,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
        };

        VideosModel.list.push(newVideo);

        return newVideo
    },

    updateVideoById: ({ videoId, params }: any) => {
        const videoById = VideosModel.list.find((video) => video.id === Number(videoId));;

        if(!videoById) {
            return null;
        }

        const updatedVideo = {
            ...videoById,
            ...params,
        }


        VideosModel.list.push(updatedVideo);

        return updatedVideo;
    },


    deletedVideosById: ( { videoId }: any ) => {
        const videoById = VideosModel.list.find((video) => video.id === Number(videoId));

        if (!videoById) {
            return null;
        }

        VideosModel.list = VideosModel.list.filter((video) => video.id !== videoById.id);

        return 204;

    }
}