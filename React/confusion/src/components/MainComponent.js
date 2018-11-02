import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment, fetchComments, fetchDishes, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {commentsPropTypes} from "../redux/comments";
import {dishesPropTypes} from "../redux/dishes";
import {leaderPropTypes} from "../redux/leaders";
import {promotionPropTypes} from "../redux/promotions";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => {
    dispatch(addComment(dishId, rating, author, comment));
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const HomePage = () => {
      return (
          <Home dish={this.props.dishes.dishes.filter(d => d.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter(p => p.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter(l => l.featured)[0]}
          />
      );
    };

    const DishWithId = ({match}) => {
      const dishId = parseInt(match.params.dishId, 10);
      return (
          <DishDetail dish={this.props.dishes.dishes.filter(dish => dish.id === dishId)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)}
              commentsErrMess={this.props.comments.errMess}
              addComment={this.props.addComment}
          />
      );
    };

    return (
        <>
          <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus"
                component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

Main.propTypes = {
  addComment: PropTypes.func.isRequired,
  fetchDishes: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  fetchPromos: PropTypes.func.isRequired,
  resetFeedbackForm: PropTypes.func.isRequired,
  comments: commentsPropTypes.isRequired,
  dishes: dishesPropTypes.isRequired,
  leaders: PropTypes.arrayOf(leaderPropTypes).isRequired,
  promotions: promotionPropTypes.isRequired
};