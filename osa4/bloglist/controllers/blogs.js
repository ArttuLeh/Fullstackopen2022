const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
   response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
   const blog = await Blog.findById(request.params.id)
   if (blog) {
      response.json(blog.toJSON())
   } else {
      response.status(404).end()
   }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
   const body = request.body
   const user = await User.findById(request.user)

   if (body.likes === undefined) {
      body.likes = 0
   }

   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes
   })

   const savedBlog = await blog.save()
   await savedBlog.populate('user', { username: 1, name: 1 })
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()

   response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
   const user = await User.findById(request.user)
   const blog = await Blog.findById(request.params.id)

   if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
   } else {
      response.status(401).json({ error: 'unauthorized action' })
   }
})

blogsRouter.put('/:id', async (request, response) => {
   const body = request.body

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
   }

   const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true }
   ).populate('user', { username: 1, name: 1 })
   response.status(200).json(updatedBlog)
})

module.exports = blogsRouter