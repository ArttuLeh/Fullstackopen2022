import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ authors, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token !== null ? (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              <select
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                <option value="">--select name--</option>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default Authors
