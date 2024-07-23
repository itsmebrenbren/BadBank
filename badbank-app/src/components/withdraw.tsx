import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';
import { Alert, Button, Card, Form, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { authAtom } from './atoms/authAtom';

interface WithdrawFormInputs {
  withdrawAmount: number;
  accountType: 'chequing' | 'savings';
}

export default function Withdraw() {
  const [user, setUser] = useAtom(userAtom);
  const isAuthenticated = useAtomValue(authAtom);
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm<WithdrawFormInputs>({
    mode: 'onChange',
  });
  const [accountType, setAccountType] = useState<'chequing' | 'savings'>('chequing');

  const chequing = user?.accounts ? user.accounts.chequing : 0;
  const savings = user?.accounts ? user.accounts.savings : 0;

  const onSubmit: SubmitHandler<WithdrawFormInputs> = async (data) => {
    if (!isAuthenticated) return;

    const withdrawAmount = parseFloat(data.withdrawAmount.toString());
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      try {
        console.log('Withdraw request:', {
          amount: withdrawAmount,
          accountType,
        });

        const response = await axios.post(`https://104.248.233.243.nip.io/api/accounts/withdraw`, {
          amount: withdrawAmount,
          accountType,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Use token from localStorage
          }
        });

        const updatedBalance = response.data.accounts[accountType];
        setUser((prevUser: any) => ({
          ...prevUser,
          accounts: {
            ...prevUser.accounts,
            [accountType]: updatedBalance
          }
        }));

        alert(`You have successfully withdrawn $${withdrawAmount.toFixed(2)} from your ${accountType} account.`);
        reset({ withdrawAmount: 0 });
      } catch (error) {
        alert('An error occurred while processing your withdrawal. Please try again.');
        console.error('Withdraw error:', error);
      }
    }
  };

  const withdrawAmountValue = watch('withdrawAmount');
  const isInvalidAmount = withdrawAmountValue && (isNaN(withdrawAmountValue) || withdrawAmountValue <= 0);
  const isOverdraft = withdrawAmountValue > (accountType === 'chequing' ? chequing : savings);

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
          <Card.Title className='title'>Withdraw</Card.Title>
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
              <Form.Label>Withdraw Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("withdrawAmount", { required: true, min: 0.01 })}
                />
              </InputGroup>
              {errors.withdrawAmount?.type === 'required' && <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>}
              {errors.withdrawAmount?.type === 'min' && <Form.Control.Feedback type="invalid">Withdrawal must be greater than $0.01.</Form.Control.Feedback>}
              {isInvalidAmount && <Alert variant="danger">Withdrawal must be a positive number.</Alert>}
              {isOverdraft && <Alert variant="warning">Withdrawal amount exceeds account balance.</Alert>}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isValid || isInvalidAmount || isOverdraft}>
              Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}


