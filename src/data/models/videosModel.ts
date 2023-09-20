export interface Video {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: string[];
}

export interface VideosModel {
    list: Video[];
}
export const VideosModel: VideosModel = {
    list: []
}