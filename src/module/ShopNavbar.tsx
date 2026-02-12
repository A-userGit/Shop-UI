import {useAuthContext} from "react-oauth2-code-pkce";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserOptions from './UserOptions'
import { Link } from 'react-router-dom';

const ShopNavbar = () => {
    const { token, logIn, loginInProgress, logOut } = useAuthContext();
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Simple shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto">
                        {token ? (<NavDropdown title={<UserOptions/>} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/orders">
                                Orders
                            </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=> logOut()}>
                                    Logout
                                </NavDropdown.Item>
                        </NavDropdown>
                            ) :
                                (<>
                                    <Button onClick={() => logIn()} disabled={loginInProgress}
                                            variant="outline-success">Login</Button>
                                    <Nav.Link as={Link} to="/register" >Signup</Nav.Link>
                                </>)
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default ShopNavbar;