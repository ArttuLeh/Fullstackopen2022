import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import { BOOK_ADDED } from './queries'
import { useState } from 'react'
import Notify from './components/Notify'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading..</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div>
        {!token ? (
          <div>
            <Notify errorMessage={errorMessage} />
            <Link to="/">
              <button>Authors</button>
            </Link>
            <Link to="/books">
              <button>Books</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Routes>
              <Route
                path="/"
                element={
                  <Authors
                    authors={resultAuthors.data.allAuthors}
                    token={token}
                  />
                }
              />
              <Route
                path="books"
                element={<Books books={resultBooks.data.allBooks} />}
              />
              <Route
                path="login"
                element={<LoginForm setToken={setToken} setError={notify} />}
              />
            </Routes>
          </div>
        ) : (
          <div>
            <Notify errorMessage={errorMessage} />
            <Link to="/">
              <button>Authors</button>
            </Link>
            <Link to="/books">
              <button>Books</button>
            </Link>
            <Link to="/addBook">
              <button>Add book</button>
            </Link>
            <Link to="/recommend">
              <button>Recommend</button>
            </Link>
            <button onClick={logout}>logout</button>
            <Routes>
              <Route
                path="/"
                element={
                  <Authors
                    authors={resultAuthors.data.allAuthors}
                    token={token}
                  />
                }
              />
              <Route
                path="books"
                element={<Books books={resultBooks.data.allBooks} />}
              />
              <Route path="addBook" element={<NewBook setError={notify} />} />
              <Route
                path="recommend"
                element={
                  <Recommend
                    books={resultBooks.data.allBooks}
                    setError={notify}
                  />
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
