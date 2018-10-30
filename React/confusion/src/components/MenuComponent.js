import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

const RenderMenuItem = ({dish, onClick}) => (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name}/>
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
);

function Menu(props) {
    const menu = props.dishes.map((dish) => {
      return (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <RenderMenuItem dish={dish} onClick={props.onClick}/>
          </div>
      );
    });

    return (
        <div className="container">
          <div className="row">
            {menu}
          </div>
        </div>
    );
}
export default Menu;

RenderMenuItem.propTypes = {
  dish: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

Menu.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func
};