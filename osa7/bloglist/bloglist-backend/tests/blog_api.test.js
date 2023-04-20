const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const login = {
    username: 'root',
    password: 'sekret',
  }

  await api
    .post('/api/login')
    .send(login)
    .expect((response) => {
      token = response.body.token
    })
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('blog id should be id not _id', async () => {
    const res = await api.get('/api/blogs')
    const id = res.body.map((r) => r.id)
    expect(id[0]).toBeDefined()
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testing testing',
      author: 'Make',
      url: 'testit.fi',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((n) => n.title)
    expect(titles).toContain('testing testing')
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Make',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if likes is undefined it should be 0', async () => {
    const newBlog = {
      title: 'testing testing',
      author: 'Make',
      url: 'testit.fi',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('succeeds with statuscode 401 if post without token', async () => {
    const newBlog = {
      title: 'testing testing',
      author: 'Make',
      url: 'testit.fi',
      likes: 4,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of blog', () => {
  beforeEach(async () => {
    const newBlog = {
      title: 'testing deletion',
      author: 'root',
      url: 'testing.com',
      likes: 8,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
  })
  test('succeeds with statuscode 204 if blog deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
  test('succeeds with statuscode 401 if blog deleted without token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('updating blog', () => {
  test('update blog successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateBlog = {
      likes: 44,
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updateBlog).not.toContain(blogToUpdate.likes)
    expect(updateBlog.likes).toBe(44)
  })
})

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'arttulehto',
      name: 'Arttu Lehtovaara',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fail if username is not unique', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'root',
      password: 'sekret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"username must be unique"}')

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fail if username is too short', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'ro',
      password: 'sekret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3)."}'
      )

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fail if password is too short', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'rooot',
      password: 'se',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"password is too short"}')

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
