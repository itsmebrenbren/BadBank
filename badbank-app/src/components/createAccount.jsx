import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { userAtom } from './atom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

export default function CreateAccount() {
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });
  const [, setUser] = useAtom(userAtom);
  const [submitted, setSubmitted] = useState(false);

  const watchedFields = watch();

  const isFormFilled = watchedFields.firstName && watchedFields.lastName && watchedFields.email && watchedFields.password;

  const emailFeedback = watchedFields.email && watchedFields.email.length > 0 && watchedFields.email.length < 8
  ? 'Must be an email address.'
  : null;
  const passwordFeedback = watchedFields.password && watchedFields.password.length > 0 && watchedFields.password.length < 8
  ? "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*())."
  : null;

  const onSubmit = (newUserData) => {
    setUser((oldUsers) => [...oldUsers, newUserData]);
    reset();
    setSubmitted(true);
    alert("You have successfully created an account");
  };
  

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
                isInvalid={errors.firstName}
              />
              {errors.firstName && <Form.Control.Feedback type="invalid">First Name is required.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register("lastName", { required: true, maxLength: 20 })}
                isInvalid={errors.lastName}
              />
              {errors.lastName && <Form.Control.Feedback type="invalid">Last Name is required.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                isInvalid={errors.email}
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
                isInvalid={errors.password}
              />
              {errors.password && <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>}
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
}
