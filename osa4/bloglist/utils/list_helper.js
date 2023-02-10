
const _ = require('lodash')

const dummy = (blogs) => {
   return blogs.lenght = 1
}

const totalLikes = (blogs) => {
   return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
   const mostLikedBlog = blogs.reduce((acc, cur) => {
      return acc.likes > cur.likes ? acc : cur
   })
   return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
   }
}

const mostBlogs = (blogs) => {
   const result = _(blogs)
      .countBy('author')
      .entries()
      .map(values =>
         _.zipObject([ 'author', 'blogs' ], values))
      .maxBy('blogs')
   return result
}

const mostLikes = (blogs) => {
   const result = _(blogs)
      .groupBy('author')
      .mapValues(arr => _.sumBy(arr, 'likes'))
      .entries()
      .map(values =>
         _.zipObject([ 'author', 'likes' ], values))
      .maxBy('likes')
   return result
}

module.exports = {
   dummy,
   totalLikes,
   favoriteBlog,
   mostBlogs,
   mostLikes
}