import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col} from 'reactstrap';

function RenderCard({item}) {
  return (
      <Card>
        <CardImg src={item.image} alt={item.name}/>
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
  );
}

function Home(props) {
  return (
      <Container>
        <Row className="align-items-start">
          <Col md className="m-1">
            <RenderCard item={props.dish}/>
          </Col>
          <Col md className="m-1">
            <RenderCard item={props.promotion}/>
          </Col>
          <Col md className="m-1">
            <RenderCard item={props.leader}/>
          </Col>
        </Row>
      </Container>
  );
}

export default Home;

Home.propTypes = {
  dish: PropTypes.object.isRequired,
  leader: PropTypes.object.isRequired,
  promotion: PropTypes.object.isRequired
};

RenderCard.propTypes = {
  item: PropTypes.object.isRequired
};