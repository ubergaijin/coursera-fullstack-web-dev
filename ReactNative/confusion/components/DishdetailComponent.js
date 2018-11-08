import * as React from 'react';
import { Button, FlatList, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish({ dish, favorite, onPressFavorite, onPressComment }) {
  if (dish != null) {
    return (
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
            <Text style={{ margin: 10 }}>
              {dish.description}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon raised reverse name={favorite ? 'heart' : 'heart-o'}
                  type='font-awesome' color='#f50'
                  onPress={() => favorite ? console.log('Already favorite') : onPressFavorite()} />
              <Icon raised reverse name='pencil' type='font-awesome' color='#512da8'
                  onPress={() => onPressComment()} />
            </View>
          </Card>
        </Animatable.View>
    );
  } else {
    return <View />;
  }
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item, index }) => {
    return (
        <View key={index} style={{ margin: 10, justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Rating readonly startingValue={item.rating} imageSize={12}
              style={{ alignItems: 'flex-start' }} />
          <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
        </View>
    );
  };

  return (
      <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
        <Card title='Comments'>
          <FlatList data={comments} renderItem={renderCommentItem}
              keyExtractor={item => item.id.toString()} />
        </Card>
      </Animatable.View>
  );
}

class Dishdetail extends React.Component {
  static navigationOptions = {
    title: 'Dish Details'
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: '',
      comment: '',
      showModal: false
    };
  }

  showModal(show = true) {
    this.setState({ showModal: show });
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      comment: ''
    });
  }

  handleComment(dishId) {
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    return (
        <ScrollView>
          <RenderDish
              dish={this.props.dishes.dishes[+dishId]}
              favorite={this.props.favorites.some(favId => favId === dishId)}
              onPressFavorite={() => this.markFavorite(dishId)}
              onPressComment={() => this.showModal()}
          />
          <RenderComments
              comments={this.props.comments.comments.filter(c => c.dishId === dishId)}
          />
          <Modal animationType='slide'
              transparent={false}
              visible={this.state.showModal}
              onDismiss={() => this.resetForm()}
              onRequestClose={() => {
                this.resetForm();
                this.showModal(false);
              }}>
            <View style={{ margin: 20 }}>
              <Rating
                  showRating
                  style={styles.formItem}
                  startingValue={this.state.rating}
                  imageSize={26}
                  onFinishRating={val => this.setState({ rating: val })}
              />
              <Input
                  value={this.state.author}
                  placeholder='Author'
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={text => this.setState({ author: text })}
              />
              <Input
                  value={this.state.comment}
                  placeholder='Comment'
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  onChangeText={text => this.setState({ comment: text })}
              />
              <View style={{ margin: 10 }}>
                <Button title='Submit'
                    color='#512da8'
                    onPress={() => {
                      this.handleComment(dishId);
                      this.showModal(false);
                    }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Button title='Cancel'
                    color='grey'
                    onPress={() => {
                      this.showModal(false);
                    }}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512d8a',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);