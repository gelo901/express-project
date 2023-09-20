import { Video, VideosModel } from "../data/models";

export const videosService = {
    getAllVideos: () => {
        return VideosModel.list;
    },
    getVideosById: ({ videoId }: { videoId: number }) => {
        if(!videoId || VideosModel.list.length) {
            return null;
        }
        return VideosModel.list.find((video: Video) => video.id === Number(videoId));
    },
    postVideos: ({ title, author, availableResolutions }: any) => {

        let video = null;


        if(VideosModel.list.length) {
            video = VideosModel.list.reduce((maxVideo: Video, currentVideo: Video) => {
                if (currentVideo.id > maxVideo.id) {
                    return currentVideo;
                }
                return maxVideo;
            });
        }

        const newVideo = {
            id: video ? video.id + 1 : 1,
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
        const videoById = VideosModel.list.find((video: Video) => video.id === Number(videoId));;

        if(!videoById) {
            return null;
        }

        const updatedVideo = {
            ...videoById,
            ...params,
        }

        VideosModel.list = VideosModel.list.filter((video: Video) => video.id !== updatedVideo.id);
        VideosModel.list.push(updatedVideo);

        return updatedVideo;
    },


    deletedVideosById: ( { videoId }: any ) => {
        const videoById = VideosModel.list.find((video: Video) => video.id === Number(videoId));

        if (!videoById) {
            return null;
        }

        VideosModel.list = VideosModel.list.filter((video: Video) => video.id !== videoById.id);

        return 204;

    }
}