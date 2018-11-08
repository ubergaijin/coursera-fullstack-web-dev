import * as React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loader } from './LoadingComponent';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  promotions: state.promotions,
  leaders: state.leaders
});

function RenderItem({ item, isLoading, errMess }) {
  return (
      <Loader isLoading={isLoading} errMess={errMess}>
        {item == null ? <View /> : (
            <Card featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseUrl + item.image }}>
              <Text styke={{ margin: 10 }}>
                {item.description}
              </Text>
            </Card>
        )}
      </Loader>
  );
}

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
        this.animatedValue,
        {
          toValue: 8,
          duration: 8000,
          easing: Easing.linear
        }
    ).start(() => this.animate());
  }

  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    });

    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    });

    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    });

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }}>
            <RenderItem
                item={this.props.dishes.dishes.filter(e => e.featured)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
            />
          </Animated.View>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
            <RenderItem
                item={this.props.promotions.promotions.filter(e => e.featured)[0]}
                isLoading={this.props.promotions.isLoading}
                errMess={this.props.promotions.errMess}
            />
          </Animated.View>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
            <RenderItem
                item={this.props.leaders.leaders.filter(e => e.featured)[0]}
                isLoading={this.props.leaders.isLoading}
                errMess={this.props.leaders.errMess}
            />
          </Animated.View>
        </View>
  );
  }
  }

  export default connect(mapStateToProps)(Home);