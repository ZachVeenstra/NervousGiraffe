import { auth, } from "../config/firebase";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import functions from 'firebase/functions';
// import admin from 'firebase-admin'
// import addAdminRole from "../functions/index";

export const Auth = () => {
    const [email, setEmail] = useState("");
    // const [adminEmail, setAdminEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Col className="p-3">
            <Row className="mb-4">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="auth-email" type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="auth-password">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="auth-password"
                            onChange={(e) => setPassword(e.target.value)}    
                            aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                    <Button id="auth-login" onClick={login}>Login</Button>
                </Form>
            </Row>
        </Col>
    );
};