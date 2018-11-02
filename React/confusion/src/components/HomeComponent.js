import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col} from 'reactstrap';
import {Loading} from "./LoadingComponent"
import {dishPropTypes} from "../redux/dishes";
import {leaderPropTypes} from "../redux/leaders";
import {promotionPropTypes} from "../redux/promotions";

function RenderCard({item, isLoading, errMess}) {
  if (isLoading) {
    return (
        <Loading/>
    );
  } else if (errMess) {
    return (
        <h4>{errMess}</h4>
    );
  } else {
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
}

function Home({dish, dishesLoading, dishesErrMess, promotion, leader}) {
  return (
      <Container>
        <Row className="align-items-start">
          <Col md className="m-1">
            <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess}/>
          </Col>
          <Col md className="m-1">
            <RenderCard item={promotion}/>
          </Col>
          <Col md className="m-1">
            <RenderCard item={leader}/>
          </Col>
        </Row>
      </Container>
  );
}

export default Home;

Home.propTypes = {
  dish: dishPropTypes,
  dishesErrMess: PropTypes.string,
  dishesLoading: PropTypes.bool,
  leader: leaderPropTypes,
  promotion: promotionPropTypes
};

RenderCard.propTypes = {
  isLoading: PropTypes.bool,
  errMess: PropTypes.string,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    designation: PropTypes.string,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};