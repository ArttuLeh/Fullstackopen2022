import { Nav, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => {
    return login
  })

  const logout = () => {
    dispatch(userLogout())
    dispatch(setNotification('logged out', 5))
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" className="blogs-btn">
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <strong>{user.name}</strong> is logged in{' '}
          <Button variant="light" onClick={() => logout()}>
            Logout
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar
