import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
    date: new Date().toISOString()
  };

  return fetch(baseUrl + 'comments',
      {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(response => dispatch(addComment(response)))
      .catch(error => {
        console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
      });
};

const checkFetchStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error('Error ' + response.status + ': ' + response.statusText);
  }
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
      .then(checkFetchStatus)
      .then(response => response.json())
      .then(response => dispatch(addDishes(response)))
      .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
      .then(checkFetchStatus)
      .then(response => response.json())
      .then(response => dispatch(addComments(response)))
      .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + 'promotions')
      .then(checkFetchStatus)
      .then(response => response.json())
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
