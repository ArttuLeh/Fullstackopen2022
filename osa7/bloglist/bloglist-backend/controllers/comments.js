const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body.comment
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body,
  })

  const savedComment = await comment.save()

  await savedComment.populate('blog', { title: 1, author: 1 })
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter
