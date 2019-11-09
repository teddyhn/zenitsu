import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

import "./Login.scss";

const Login = props => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState(false);

    const handleChange = evt => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        axios
          .post(`https://kitsu.io/api/oauth/token?grant_type=password&username=${credentials.email}&password=${credentials.password}`)
          .then(res => {
            localStorage.setItem('token', res.data.access_token);
            axiosWithAuth()
                .get('users?filter[self]=true')
                .then(res => {
                    localStorage.setItem('username', res.data.data[0].attributes.name);
                    localStorage.setItem('userId', res.data.data[0].id);
                    localStorage.setItem('avatar', res.data.data[0].attributes.avatar.tiny);
                    props.history.push('/');
                })
                .catch(err => console.log(err));
          })
          .catch(() => {
              setErrors(true);
          });
    };

    const token = localStorage.getItem("token");

    if (token) {
        return <Redirect to="/" />
    }
 
    return (
        <div className="login-form align-middle col-xl-2 col-md-4 col-10 p-4 rounded shadow">
            <Form onSubmit={handleSubmit}>
                <Form.Text>
                    <h4>Sign in with <img src="https://avatars1.githubusercontent.com/u/7648832?s=200&v=4" alt="Kitsu logo" /></h4>
                </Form.Text>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        name="email"
                        placeholder="Enter email"
                        type="text"
                        value={credentials.email}
                        onChange={evt => handleChange(evt)} 
                    />
                    {errors ? (
                        <Form.Text className="text-muted">
                            Please check your credentials and try again.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={credentials.password}
                        onChange={evt => handleChange(evt)}
                        isInvalid={errors}
                    />
                </Form.Group>
                <Button block variant="primary" type="submit">
                    Sign in
                </Button>
                <Form.Text className="text-muted">
                    Need an account? <a className="text-decoration-none" href="https://kitsu.io/">Register with Kitsu.</a>
                </Form.Text>
            </Form>
        </div>
    );
};

export default Login;