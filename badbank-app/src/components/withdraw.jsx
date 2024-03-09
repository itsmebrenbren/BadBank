import React from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { accountAtom } from './atoms';
import { Alert, Button, Card, Form, Container, InputGroup } from 'react-bootstrap';

export default function Withdraw() {
  const [accountState, setAccountState] = useAtom(accountAtom);
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
  });

  const withdrawAmount = watch('withdrawAmount');
  const isInvalidAmount = withdrawAmount && (isNaN(withdrawAmount) || withdrawAmount <= 0);
  const isOverdraft = withdrawAmount > accountState.balance;

  const onSubmit = (data) => {
    const withdrawalAmount = parseFloat(data.withdrawAmount);
    if (!isNaN(withdrawalAmount) && withdrawalAmount > 0) {
      if (withdrawalAmount <= accountState.balance) {
        setAccountState((prevState) => {
          const updatedBalance = prevState.balance - withdrawalAmount;
          return { balance: updatedBalance };
        });
        alert(`You have successfully withdrawn $${withdrawalAmount.toFixed(2)} from your account.`);
        reset({ withdrawAmount: '' });
      } else {
        alert("Withdrawal amount exceeds account balance.");
      }
    }
  };

  return (
    <Container>
      <Card style={{ marginTop: '5%' }}>
        <Card.Body>
          <Card.Text>
            Account Balance: ${accountState.balance.toFixed(2)}
          </Card.Text>
          <Card.Title>Withdraw</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Withdraw Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("withdrawAmount", { required: true, min: 0.01 })}
                  isInvalid={!!errors.withdrawAmount || isInvalidAmount || isOverdraft}
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
