import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { userAtom, User } from './atoms/userAtom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { authAtom } from './atoms/authAtom';
import { useAtom } from 'jotai';

interface CreateAccountFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
}

const CreateAccount: React.FC = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm<CreateAccountFormValues>({
    mode: 'onChange',
  });
  const setUser = useSetAtom(userAtom);
  const [submitted, setSubmitted] = useState(false);
  const [isAuthenticated, setAuth] = useAtom(authAtom);

  const watchedFields = watch();

  const isFormFilled = watchedFields.firstName && watchedFields.lastName && watchedFields.email && watchedFields.password;

  const emailFeedback = watchedFields.email && watchedFields.email.length > 0 && watchedFields.email.length < 8
    ? 'Must be an email address.'
    : null;
  const passwordFeedback = watchedFields.password && watchedFields.password.length > 0 && watchedFields.password.length < 8
    ? "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*())."
    : null;

  const onSubmit = async (data: CreateAccountFormValues) => {
    console.log('Submitting form:', data);

    try {
      const response = await axios.post<RegisterResponse>(`https://104.248.233.243.nip.io/api/auth/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        chequing: 1000,
        savings: 1000
      });
      console.log('Server response:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);

      reset();
      setSubmitted(true);
      alert("You have successfully created an account");
      setAuth(true);
    } catch (error) {
      console.error('Registration error:', error); // Debugging log
      alert("Failed to create account. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Card style={{ marginTop: '5%' }}>
        <Card.Body className='body-background'>
          <Card.Title className='title'>Create Account</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register("firstName", { required: true, maxLength: 20 })}
              />
              {errors.firstName && <Form.Control.Feedback type="invalid">First Name is required.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register("lastName", { required: true, maxLength: 20 })}
              />
              {errors.lastName && <Form.Control.Feedback type="invalid">Last Name is required.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                {...register("userName", { required: true })}
              />
              {errors.userName && <Form.Control.Feedback type="invalid">User Name is required.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>}
              {emailFeedback && <Alert variant="warning">{emailFeedback}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
                    message: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*())."
                  }
                })}
              />
              {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
              {passwordFeedback && <Alert variant="warning">{passwordFeedback}</Alert>}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!isFormFilled || !isValid}
            >
              {submitted ? "Create Another Account" : "Create Account"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateAccount;
