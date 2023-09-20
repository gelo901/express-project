import request from 'supertest'
import dotenv from 'dotenv'
import { app } from '../settings'
dotenv.config()

jest
    .useFakeTimers()
    .setSystemTime(new Date('2023-10-19T12:00:29.254Z'));



describe('/videos', () => {
    describe('GET', () => {
        it('should return video empty array', async () => {
            await request(app).get('/videos').expect([]);
        });
        it('should return video array with one video', async () => {
            const expectedVideos = [{
                id: 1,
                title: "back-end",
                author: "me",
                availableResolutions: ['P144'],
                canBeDownloaded: true,
                minAgeRestriction: null,
                createdAt: '2023-10-19T12:00:29.254Z',
                publicationDate: '2023-10-19T12:00:29.254Z',
            }];

            await request(app).post('/videos').send({
                title: "back-end",
                author: "me",
                availableResolutions: ['P144']
            })

            await request(app).get('/videos').expect(expectedVideos);
        });
    })
    describe('POST', () => {
        it('should create video and return status 201', async () => {

            const result = await request(app).post('/videos').send({
                title: "back-end",
                author: "me",
                availableResolutions: ['P144']
            }).expect({});

            expect(result.status).toBe(201);

        });
        it('should create video and return status 400', async () => {
            const result = await request(app).post('/videos').send({
                author: "me",
                availableResolutions: ['P144']
            });

            expect(result.status).toBe(400);

        });
    })
    // describe('GET/:id', () => {
    //     it('should return video with id 1', async () => {
    //         const expectedVideos = {
    //             id: 1,
    //             title: "back-end",
    //             author: "me",
    //             availableResolutions: ['P144'],
    //             canBeDownloaded: true,
    //             minAgeRestriction: null,
    //             createdAt: '2023-10-19T12:00:29.254Z',
    //             publicationDate: '2023-10-19T12:00:29.254Z',
    //         };
    //
    //         await request(app).post('/videos').send({
    //             title: "back-end",
    //             author: "me",
    //             availableResolutions: ['P144']
    //         })
    //
    //         await request(app).get('/videos/1').expect(expectedVideos);
    //     });
    // })
})