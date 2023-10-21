import request from 'supertest'
import dotenv from 'dotenv'
import { app } from '../settings'
import { Video } from '../data/models'
dotenv.config()

jest.useFakeTimers().setSystemTime(new Date('2023-10-19T12:00:29.254Z'))

const MOCKED_VIDEO: Video = {
  id: 1,
  title: 'back-end',
  author: 'me',
  availableResolutions: ['P144'],
  canBeDownloaded: false,
  minAgeRestriction: null,
  createdAt: '2023-10-20T12:00:29.254Z',
  publicationDate: '2023-10-20T12:00:29.254Z'
}

describe('/videos', () => {
  describe('GET', () => {
    it('should return video empty array', async () => {
      await request(app).get('/videos').expect([])
    })
    it('should return video array with one video', async () => {
      const expectedVideos = [MOCKED_VIDEO]

      await request(app)
        .post('/videos')
        .send({
          title: 'back-end',
          author: 'me',
          availableResolutions: ['P144']
        })

      await request(app).get('/videos').expect(expectedVideos)
    })
  })
  describe('POST', () => {
    it('should create video and return status 201', async () => {
      const result = await request(app)
        .post('/videos')
        .send({
          title: 'back-end',
          author: 'me',
          availableResolutions: ['P144']
        })
        .expect({ ...MOCKED_VIDEO, id: 2 })
      expect(result.status).toBe(201)
    })
    it('should create video and return status 400', async () => {
      const result = await request(app)
        .post('/videos')
        .send({
          author: 'me',
          availableResolutions: ['P144']
        })

      expect(result.status).toBe(400)
    })
  })
  describe('GET/:id', () => {
    it('should return video with id 1', async () => {
      await request(app)
        .post('/videos')
        .send({
          title: 'back-end',
          author: 'me',
          availableResolutions: ['P144']
        })

      const result = await request(app).get('/videos/1').expect(MOCKED_VIDEO)

      expect(result.status).toBe(200)
    })
    it('should return 404 status', async () => {
      const result = await request(app).get('/videos/0')
      expect(result.status).toBe(404)
    })
  })
  describe('PUT', () => {
    it('should update video and return status 204', async () => {
      const expectUpdatedVideo = {
        ...MOCKED_VIDEO,
        title: 'new title'
      }
      await request(app).post('/videos').send(expectUpdatedVideo)

      const result = await request(app).put('/videos/1').send(expectUpdatedVideo)

      expect(result.status).toBe(204)

      await request(app).get('/videos/1').expect(expectUpdatedVideo)
    })
    it('should create video and return status 400', async () => {
      const result = await request(app)
        .put('/videos/1')
        .send({
          author: 'me',
          availableResolutions: ['P144']
        })

      expect(result.status).toBe(400)
    })
  })
  describe('DELETE', () => {
    it('should delete video', async () => {
      const allVideos = await request(app).get('/videos')
      const lastVideo = allVideos.body[allVideos.body.length - 1]
      const result = await request(app).delete(`/videos/${lastVideo.id}`)
      expect(result.status).toBe(204)
      const getDeletedVideo = await request(app).get(`/videos/${lastVideo.id}`)
      expect(getDeletedVideo.status).toBe(404)
    })

    it('should delete all videos', async () => {
      const response = await request(app).delete('/testing/all-data')
      expect(response.status).toBe(204)
    })
  })
})
