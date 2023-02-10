import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
   const user = userEvent.setup()
   const createBlog = jest.fn()

   render(<BlogForm createBlog={createBlog} />)

   const inputs = screen.getAllByRole('textbox')
   const createButton = screen.getByText('Create')

   await user.type(inputs[0], 'testing a form..')
   await user.type(inputs[1], 'admin')
   await user.type(inputs[2], 'testing.com')
   await user.click(createButton)

   expect(createBlog.mock.calls).toHaveLength(1)
   expect(createBlog.mock.calls[0][0].title).toBe('testing a form..')
   expect(createBlog.mock.calls[0][0].author).toBe('admin')
   expect(createBlog.mock.calls[0][0].url).toBe('testing.com')
})