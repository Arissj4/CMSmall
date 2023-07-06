import React from "react"
import { useState } from "react";
import { Button, Container, Form, Nav } from "react-bootstrap";
import '../css/login.css'

function Loginform(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username, password };
        props.login(credentials);
    };

    return (
        <>
            <Container fluid onSubmit={handleSubmit}>
                <Form id="mainform">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" value={username} onChange={text => setUsername(text.target.value)} required={true} placeholder="Enter email"/>

                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={pass => setPassword(pass.target.value)} required={true} placeholder="Password"/>

                        <Button type="submit">
                            Log In
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default Loginform;