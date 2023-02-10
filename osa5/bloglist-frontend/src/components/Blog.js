import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {

   const [show, setShow] = useState(false)

   return (
      <div className='blogstyle'>
         {show === false ?
            <li className='blog'>
               {blog.title} <b>{blog.author}</b> <button onClick={() => setShow(!show)}>view</button>
            </li> :
            <div className='blog-view'>
               <li>{blog.title} <button onClick={() => setShow(false)}>hide</button></li>
               <li>{blog.url}</li>
               <li id='blogLike'>{blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></li>
               <li>{blog.author}</li>
               {blog.user.username === user.username &&
                  <button onClick={() => handleRemove(blog.id)}>remove</button>
               }
            </div>
         }
      </div>
   )}

export default Blog
/*<div className='blogstyle'>
         {show === false ?
            <div className='blog'>
               {blog.title} <b>{blog.author}</b> <button onClick={() => setShow(!show)}>view</button>
            </div> :
            <div className='blog-view'>
               <div>{blog.title} <button onClick={() => setShow(false)}>hide</button></div>
               <div>{blog.url}</div>
               <div id='blogLike'>{blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></div>
               <div>{blog.author}</div>
               {blog.user.username === user.username &&
                  <button onClick={() => handleRemove(blog.id)}>remove</button>
               }
            </div>
         }
      </div> */