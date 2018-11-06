import * as React from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => ({
  dishes: state.dishes
});

class Menu extends React.Component {

  static navigationOptions = {
    title: 'Menu'
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => (
        <Tile key={index}
            title={item.name}
            caption={item.description}
            featured
            imageSrc={{ uri: baseUrl + item.image }}
            onPress={() => navigate('Dishdetail', { dishId: item.id })} />
    );

    return (
        <FlatList data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} />
    );
  }
}

export default connect(mapStateToProps)(Menu);