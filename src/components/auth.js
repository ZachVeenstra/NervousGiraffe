import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Col className="p-3">
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            onChange={(e) => setPassword(e.target.value)}    
                            aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                    <Button onClick={login}>Login</Button>
                    <Button onClick={logout}>Logout</Button>
                </Form>
            </Row>
        </Col>
    );
};