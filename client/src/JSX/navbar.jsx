import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import '../css/navbar.css'

function Navbar_Temp(props) {
    
    return (
        <>
            <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand id="logo"><img src='http://localhost:5173/src/icon/CMS.png' width='35' height='35' /></Navbar.Brand>
                    <Navbar.Brand id="webname">{props.websitename}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto" id="links">
                            <LinkContainer to="/">
                                <Nav.Link onClick={() => props.setTypeofpage("pubpage")} active>Home</Nav.Link>
                            </LinkContainer>

                            {props.userrole === 'admin' ?
                                <LinkContainer to="/managepage/">
                                    <Nav.Link onClick={() => props.getallpages()}>Manage Pages</Nav.Link >
                                </LinkContainer>
                                : null
                            }

                            {props.loggedIn ?
                                <LinkContainer to="/allpages/">
                                    <Nav.Link onClick={() => props.getallpages(props.userinfo.username)}>All Pages</Nav.Link>
                                </LinkContainer>
                                : null
                            }
                        </Nav>

                        <Nav id="log">
                            {props.loggedIn ? 
                                <>
                                    <Nav.Link onClick={props.handleLogout}>
                                        <img src="http://localhost:5173/src/icon/logout.png" alt="Logout" width='35' height='35' />
                                    </Nav.Link>
                                </>
                                :
                                <>
                                    <LinkContainer to="/login/">
                                        <Nav.Link active={props.loggedIn}>
                                            <img src="http://localhost:5173/src/icon/enter.png" alt="Login" width='35' height='35' />
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                                }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navbar_Temp;