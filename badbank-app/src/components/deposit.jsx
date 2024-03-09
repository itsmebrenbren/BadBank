import React from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { accountAtom } from './atoms';
import { Alert, Button, Card, Form, Container, InputGroup } from 'react-bootstrap';

export default function Deposit() {
  const [accountState, setAccountState] = useAtom(accountAtom);
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange', 
  });

  const onSubmit = (data) => {
    const depositAmount = parseFloat(data.depositAmount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      setAccountState((prevState) => {
        const updatedBalance = prevState.balance + depositAmount;
        return { balance: updatedBalance };
      });
      alert(`You have successfully submitted $${depositAmount.toFixed(2)} into your account.`);
      reset({ depositAmount: '' });
    }
  };

  const depositAmountValue = watch('depositAmount');
  const isInvalidAmount = depositAmountValue && (isNaN(depositAmountValue) || depositAmountValue <= 0);

  return (
    <Container>
      <Card style={{ marginTop: '5%' }}>
        <Card.Body className='body-background'>
          <Card.Text>
            Account Balance: ${accountState.balance.toFixed(2)}
          </Card.Text>
          <Card.Title className='title'>Deposit</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Deposit Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("depositAmount", { required: true, min: 0.01 })}
                  isInvalid={!!errors.depositAmount || isInvalidAmount}
                />
              </InputGroup>
              {errors.depositAmount?.type === 'required' && <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>}
              {errors.depositAmount?.type === 'min' && <Form.Control.Feedback type="invalid">Deposit must be greater than $0.01.</Form.Control.Feedback>}
              {isInvalidAmount && <Alert variant="danger">Deposit must be a positive number.</Alert>}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isValid || isInvalidAmount}>
              Deposit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>

  );
}


