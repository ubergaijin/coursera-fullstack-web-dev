import * as React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish({ dish, favorite, onPress }) {
  if (dish != null) {
    return (
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>
            {dish.description}
          </Text>
          <Icon raised reverse name={favorite ? 'heart' : 'heart-o'}
              type='font-awesome' color='#f50'
              onPress={() => favorite ? console.log('Already favorite') : onPress()} />
        </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item, index }) => {
    return (
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
          <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
        </View>
    );
  };

  return (
      <Card title='Comments'>
        <FlatList data={comments} renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()} />
      </Card>
  );
}

class Dishdetail extends React.Component {
  static navigationOptions = {
    title: 'Dish Details'
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    return (
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
              favorite={this.props.favorites.some(favId => favId === dishId)}
              onPress={() => this.markFavorite(dishId)} />
          <RenderComments comments={
            this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
        </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);