import { Container, Card } from 'react-bootstrap';


export default function Home() {
  return(
    <Container>
        <Card>
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
  )
}