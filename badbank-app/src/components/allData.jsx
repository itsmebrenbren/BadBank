import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atoms';
import { Container, Card, Table } from 'react-bootstrap';

export default function AllData() {
  const [userData] = useAtom(userAtom);

  return (
    <Container>
      <Card style={{ marginTop: '5%', minWidth: '1000px' }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

