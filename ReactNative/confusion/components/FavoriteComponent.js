import * as React from 'react';
import { View, Text, FlatList, Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: dishId => dispatch(deleteFavorite(dishId))
});

class Favorites extends React.Component {
  static navigationOptions = {
    title: 'My Favorites'
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert('Delete favorite',
                'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log(item.name + ' Not Deleted')
                  },
                  {
                    text: 'OK',
                    onPress: () => this.props.deleteFavorite(item.id)
                  }
                ],
                { cancelable: false }
            );
          }
        }
      ];

      return (
          <Swipeout right={rightButton} autoClose>
            <Animatable.View animation='fadeInRightBig' duration={2000}>
              <ListItem
                  key={index}
                  title={item.name}
                  subtitle={item.description}
                  hideChevron={true}
                  onPress={() => navigate('Dishdetail', { dishId: item.id })}
                  leftAvatar={{ source: { uri: baseUrl + item.image } }}
              />
            </Animatable.View>
          </Swipeout>
      );
    };

    if (this.props.dishes.isLoading) {
      return (
          <Loading />
      );
    } else if (this.props.dishes.errMess) {
      return (
          <View>
            <Text>{this.props.dishes.errMess}</Text>
          </View>
      );
    } else {
      return (
          <FlatList
              data={this.props.dishes.dishes.filter(
                  dish => this.props.favorites.some(fav => fav === dish.id))}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id.toString()}
          />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);