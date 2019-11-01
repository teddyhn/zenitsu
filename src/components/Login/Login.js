import React from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import "./Login.scss";

const Login = props => {
 
    return (
        <div className="login-form col-2 p-4 rounded shadow">
            <Form>
                <Form.Text>
                    <h3>Sign in with <img src="https://i.imgur.com/n7YQZGU.png" /></h3>
                </Form.Text>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button block variant="primary" type="submit">
                    Sign In
                </Button>
                <Form.Text className="text-muted">
                    Need an account? <a className="text-decoration-none" href="https://kitsu.io/">Register with Kitsu.</a>
                </Form.Text>
            </Form>
        </div>
    );
};

export default Login;