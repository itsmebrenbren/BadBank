import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';
import { Alert, Button, Card, Form, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './hooks/useAuth';

interface DepositFormInputs {
  depositAmount: number;
  accountType: 'chequing' | 'savings';
}

export default function Deposit() {
  const [user, setUser] = useAtom(userAtom);
  const { token } = useAuth();
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm<DepositFormInputs>({
    mode: 'onChange',
  });
  const [accountType, setAccountType] = useState<'chequing' | 'savings'>('chequing');

  const chequing = user?.accounts?.chequing || 0;
  const savings = user?.accounts?.savings || 0;

  useEffect(() => {
    console.log('User atom state:', user);
    console.log('Token:', token);
  }, [user, token]);

  const onSubmit: SubmitHandler<DepositFormInputs> = async (data) => {
    const depositAmount = parseFloat(data.depositAmount.toString());
    if (!isNaN(depositAmount) && depositAmount > 0) {
      try {
        console.log('Deposit request:', {
          amount: depositAmount,
          accountType,
        });

        const response = await axios.post('http://localhost:3002/api/accounts/deposit', {
          amount: depositAmount,
          accountType,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const updatedBalance = response.data.accounts[accountType];
        setUser((prevUser: any) => ({
          ...prevUser,
          accounts: {
            ...prevUser.accounts,
            [accountType]: updatedBalance,
          }
        }));
        alert(`You have successfully deposited $${depositAmount.toFixed(2)} into your ${accountType} account.`);
        reset({ depositAmount: 0 });
      } catch (error) {
        alert('An error occurred while processing your deposit. Please try again.');
        console.error('Deposit error:', error);
      }
    }
  };

  const depositAmountValue = watch('depositAmount');
  const isInvalidAmount = depositAmountValue && (isNaN(depositAmountValue) || depositAmountValue <= 0);

  return (
    <Container>
      <Card style={{ marginTop: '5%' }}>
        <Card.Body className='body-background'>
          <Card.Text>
            Chequing Balance: ${chequing !== undefined ? chequing.toFixed(2) : '0.00'}
          </Card.Text>
          <Card.Text>
            Savings Balance: ${savings !== undefined ? savings.toFixed(2) : '0.00'}
          </Card.Text>
          <Card.Title className='title'>Deposit</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as 'chequing' | 'savings')}
              >
                <option value="chequing">Chequing</option>
                <option value="savings">Savings</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deposit Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("depositAmount", { required: true, min: 0.01 })}
                />
              </InputGroup>
              {errors.depositAmount?.type === 'required' && <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>}
              {errors.depositAmount?.type === 'min' && <Form.Control.Feedback type="invalid">Deposit must be greater than $0.01.</Form.Control.Feedback>}
              {isInvalidAmount && <Alert variant="danger">Deposit must be a positive number.</Alert>}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isValid}>
              Deposit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}






