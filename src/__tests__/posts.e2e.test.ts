import request from 'supertest'
import dotenv from 'dotenv'
import { app } from '../settings'
dotenv.config()

const MOCKED_POST = {
  id: '1',
  title: 'new blog',
  shortDescription: 'awdawdawdawdawdw',
  content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
  blogId: '1',
  blogName: 'new blog'
}

const TEST_AUTH_TOKEN = 'YWRtaW46cXdlcnR5'

describe('/posts', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await request(app).delete('/testing/all-data')
  })

  describe('GET', () => {
    it('should return posts empty array', async () => {
      await request(app).get('/posts').expect([]).set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
    })
    it('should return posts array with one posts', async () => {
      const expectedPosts = [MOCKED_POST]

      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        title: 'new blog',
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      await request(app).get('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).expect(expectedPosts)
    })
  })
  describe('POST', () => {
    it('should create posts and return status 201', async () => {
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      const result = await request(app)
        .post('/posts')
        .set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
        .send({
          title: 'new blog',
          shortDescription: 'awdawdawdawdawdw',
          content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
          blogId: '1'
        })
        .expect({ ...MOCKED_POST, id: '1' })
      expect(result.status).toBe(201)
    })
    it('should create posts and return status 400', async () => {
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      const result = await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      expect(result.status).toBe(400)
    })
  })
  describe('GET/:id', () => {
    it('should return post with id 1', async () => {
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        title: 'new blog',
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      const result = await request(app)
        .get('/posts/1')
        .expect(MOCKED_POST)
        .set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)

      expect(result.status).toBe(200)
    })
    it('should return 404 status', async () => {
      const result = await request(app).get('/posts/0').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
      expect(result.status).toBe(404)
    })
  })
  describe('PUT', () => {
    it('should update posts and return status 204', async () => {
      const expectUpdatedPosts = {
        ...MOCKED_POST,
        content: '12345678'
      }
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        title: 'new blog',
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      const result = await request(app)
        .put('/posts/1')
        .set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
        .send(expectUpdatedPosts)

      expect(result.status).toBe(204)

      await request(app).get('/posts/1').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).expect(expectUpdatedPosts)
    })
    it('should create posts and return status 400', async () => {
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        title: 'new blog',
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      const result = await request(app).put('/posts/1').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })

      expect(result.status).toBe(400)
    })
  })
  describe('DELETE', () => {
    it('should delete post', async () => {
      await request(app).post('/blogs').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl: 'https://www.youtube.com/'
      })

      await request(app).post('/posts').set('Authorization', `Basic ${TEST_AUTH_TOKEN}`).send({
        title: 'new blog',
        shortDescription: 'awdawdawdawdawdw',
        content: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        blogId: '1'
      })
      const result = await request(app).delete(`/posts/1`).set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
      expect(result.status).toBe(204)
      const getDeletedPosts = await request(app).get(`/posts/1`).set('Authorization', `Basic ${TEST_AUTH_TOKEN}`)
      expect(getDeletedPosts.status).toBe(404)
    })
  })
})
