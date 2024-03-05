import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';

export default function Home() {
  return(
    <>
      <Container>
        <Card style={{ marginTop: '15%' }}>
          <Card.Body>
            <Card.Title>
              Welcome to Bad Bank
            </Card.Title>
            <Card.Subtitle>
              Where nothing is safe
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}