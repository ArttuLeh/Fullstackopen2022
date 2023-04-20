import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('frontend test for blogs', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Admin',
    likes: 0,
    url: 'testing.com',
    user: {
      username: 'username',
      name: 'name',
    },
  }

  test('render blog', () => {
    render(<Blog blog={blog} />)

    const title = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(title).toBeDefined()
  })

  test('clicking the button calls event handler once and show blogs all fields', async () => {
    render(<Blog blog={blog} user={blog.user.username} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(title).toBeDefined()
    const url = screen.getByText('testing.com')
    expect(url).toBeDefined()
    const likes = screen.getByText('0')
    expect(likes).toBeDefined()
    const author = screen.getByText('Admin')
    expect(author).toBeDefined()
  })

  test('clicking like button twice', async () => {
    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} user={blog.user.username} handleLike={mockHandler} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
