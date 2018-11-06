import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  promotions: state.promotions,
  leaders: state.leaders
});

function RenderItem({ item }) {
  if (item != null) {
    return (
        <Card featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl + item.image }}>
          <Text styke={{ margin: 10 }}>
            {item.description}
          </Text>
        </Card>
    );
  } else {
    return <View />;
  }
}

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
        <ScrollView>
          <RenderItem item={this.props.dishes.dishes.filter(e => e.featured)[0]} />
          <RenderItem item={this.props.promotions.promotions.filter(e => e.featured)[0]} />
          <RenderItem item={this.props.leaders.leaders.filter(e => e.featured)[0]} />
        </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);