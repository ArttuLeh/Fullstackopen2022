import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = () => {
  const { data: user } = useQuery(USER)
  const { data: books } = useQuery(ALL_BOOKS, {
    variables: {
      genre: user ? user.me.favoriteGenre : null,
    },
    skip: !user,
  })

  return (
    <div>
      {books?.allBooks?.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No recommended books..</div>
      )}
    </div>
  )
}
export default Recommend
