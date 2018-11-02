import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from "./LoadingComponent";
import {dishPropTypes, dishesPropTypes} from "../redux/dishes";

const RenderMenuItem = ({dish}) => (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
);

function Menu({dishes: {isLoading, errMess, dishes}}) {
  const menu = dishes.map(
      (dish) => (
          <Col key={dish.id} md={5} className="m-1">
            <RenderMenuItem dish={dish}/>
          </Col>
      )
  );

  if (isLoading) {
    return (
        <div className="container">
          <div className="row">
            <Loading/>
          </div>
        </div>
    );
  } else if (errMess) {
    return (
        <div className="container">
          <div className="row">
            <h4>{errMess}</h4>
          </div>
        </div>
    );
  } else {
    return (
        <Container>
          <Row>
            <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <Col xs={12}>
              <h3>Menu</h3>
              <hr/>
            </Col>
          </Row>
          <Row>
            {menu}
          </Row>
        </Container>
    );
  }
}

export default Menu;

RenderMenuItem.propTypes = {
  dish: dishPropTypes.isRequired
};

Menu.propTypes = {
  dishes: dishesPropTypes.isRequired
};