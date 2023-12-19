import request from 'supertest'
import dotenv from 'dotenv'
import { app } from '../settings'
import { Blog } from '../data/models'
dotenv.config()

const MOCKED_BLOG: Blog = {
  id: '1',
  name: 'test blog',
  description: 'awdadawdawdawd',
  websiteUrl: 'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
}

const TEST_AUTH_TOKEN = 'YWRtaW5ccXdlcnR5'

describe('/blogs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await request(app).delete('/testing/all-data/blogs')
  })
  describe('GET', () => {
    it('should return blogs empty array', async () => {
      await request(app).get('/blogs').expect([]).set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
    })
    it('should return blogs array with one blogs', async () => {
      const expectedblogs = [MOCKED_BLOG]

      await request(app).post('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })

      await request(app).get('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).expect(expectedblogs)
    })
  })
  describe('POST', () => {
    it('should create blogs and return status 201', async () => {
      const result = await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
        .send({
          name: 'test blog',
          description: 'awdadawdawdawd',
          websiteUrl:
            'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
        })
        .expect({ ...MOCKED_BLOG, id: '1' })
      expect(result.status).toBe(201)
    })
    it('should create blogs and return status 400', async () => {
      const result = await request(app).post('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        description: 'awdadawdawdawd',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })

      expect(result.status).toBe(400)
    })
  })
  describe('GET/:id', () => {
    it('should return blog with id 1', async () => {
      await request(app).post('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })

      const result = await request(app)
        .get('/blogs/1')
        .expect(MOCKED_BLOG)
        .set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)

      expect(result.status).toBe(200)
    })
    it('should return 404 status', async () => {
      const result = await request(app).get('/blogs/0').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
      expect(result.status).toBe(404)
    })
  })
  describe('PUT', () => {
    it('should update blogs and return status 204', async () => {
      const expectUpdatedBlog = {
        ...MOCKED_BLOG,
        name: 'new name'
      }
      await request(app).post('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })

      const result = await request(app)
        .put('/blogs/1')
        .set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
        .send(expectUpdatedBlog)

      expect(result.status).toBe(204)

      await request(app).get('/blogs/1').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).expect(expectUpdatedBlog)
    })
    it('should create blogs and return status 400', async () => {
      const result = await request(app).put('/blogs/1').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })

      expect(result.status).toBe(400)
    })
  })
  describe('DELETE', () => {
    it('should delete blog', async () => {
      await request(app).post('/blogs').set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`).send({
        name: 'test blog',
        description: 'awdadawdawdawd',
        websiteUrl:
          'https://YQ3TaDNw5pJllLSUQFY0Ssj-2sxe2Q17CHNs1c_3XMDRnNBcAipPhHOBT1FZLPiUDLU9ee8RHlTubTcHEAW.0lO6w7e0'
      })
      const result = await request(app).delete(`/blogs/1`).set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
      expect(result.status).toBe(204)
      const getDeletedblogs = await request(app).get(`/blogs/1`).set('Authorization', `Bearer ${TEST_AUTH_TOKEN}`)
      expect(getDeletedblogs.status).toBe(404)
    })
  })
})
