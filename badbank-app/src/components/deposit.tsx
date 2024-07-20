import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtom } from 'jotai';
import { Account, accountAtom } from './atoms/accountAtom';
import { Alert, Button, Card, Form, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';

interface DepositFormInputs {
  depositAmount: number;
  userId: string;
  accountType: 'chequing' | 'savings';
}

export default function Deposit() {
  const [accountState, setAccountState] = useAtom(accountAtom);
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm<DepositFormInputs>({
    mode: 'onChange',
  });
  const [accountType, setAccountType] = useState<'chequing' | 'savings'>('chequing'); // Default to chequing

  const onSubmit: SubmitHandler<DepositFormInputs> = async (data) => {
    const depositAmount = parseFloat(data.depositAmount.toString());
    if (!isNaN(depositAmount) && depositAmount > 0) {
      try {
        const response = await axios.post('/api/accounts/deposit', {
          userId: accountState.userId,
          amount: depositAmount,
          accountType, // Specify which account to deposit into
        });

        const updatedBalance = response.data.balance;
        setAccountState((prevState: Account) => ({
          ...prevState,
          [accountType]: updatedBalance, // Update the balance for the selected account type
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
            Chequing Balance: ${accountState.chequing.toFixed(2)}
          </Card.Text>
          <Card.Text>
            Savings Balance: ${accountState.savings.toFixed(2)}
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
            <Button variant="primary" type="submit">
              Deposit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}


