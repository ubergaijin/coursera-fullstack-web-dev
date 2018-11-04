import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

function RenderItem({ item }) {
  if (item != null) {
    return (
        <Card featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}>
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

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    return (
        <ScrollView>
          <RenderItem item={this.state.dishes.filter(e => e.featured)[0]} />
          <RenderItem item={this.state.promotions.filter(e => e.featured)[0]} />
          <RenderItem item={this.state.leaders.filter(e => e.featured)[0]} />
        </ScrollView>
    );
  }
}

export default Home;