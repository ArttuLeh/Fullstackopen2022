import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ books }) => {
  const [genre, setGenre] = useState('')
  const { data: booksByGenre } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  const splitGenres = [].concat(books.map((g) => g.genres))
  const genres = [...new Set(splitGenres.flat())]

  return (
    <div>
      <h2>books</h2>
      {genre && booksByGenre ? (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {booksByGenre.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {genres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          ))}
          <button value="all" onClick={() => setGenre('')}>
            all genres
          </button>
        </div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {genres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Books
