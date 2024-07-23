import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<LoginFormValues>({
    mode: 'onChange',
  });
  const { login } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await login(data.email, data.password);
      reset();
      setSubmitted(true);
      alert("You have successfully logged in");
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError("Failed to log in. Please try again.");
    }
  };

  if (isLoggedIn === true) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Card style={{ marginTop: '5%' }}>
        <Card.Body className='body-background'>
          <Card.Title className='title'>Login</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                isInvalid={!!errors.email}
              />
              {errors.email && <Form.Control.Feedback type="invalid">Email is required and must be a valid email address.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: "Password is required" })}
                isInvalid={!!errors.password}
              />
              {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
            </Form.Group>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Button variant="primary" type="submit" disabled={!isValid}>
              {submitted ? "Log In Again" : "Log In"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;





