import { Container, Card, CardText } from 'react-bootstrap';


export default function Home() {
  return(
    <Container style={{ marginTop: '5%' }}>
        <Card>
          <Card.Body className='body-background'>
            <Card.Title className='title display-3'>
              Welcome to BadBank
            </Card.Title>
            <Card.Subtitle>
              Where nothing is safe and everything is terrible.
            </Card.Subtitle>
            <Card.Img variant="top" src="/bank.png" alt="Bank Image" style={{ maxWidth: '200px', maxHeight:'200px', justifyContent: 'center'}} />
            <br/>
            <CardText>We don't even have any money, but you can make as many accounts as you
              want and randomly withdraw and deposit fake money. <br/>
              Remember, nothing matters and life is stupid.
            </CardText>
          </Card.Body>
        </Card>
    </Container>
  )
}