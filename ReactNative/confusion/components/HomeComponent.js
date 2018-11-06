import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
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

  render() {
    return (
        <ScrollView>
          <RenderItem item={this.props.dishes.dishes.filter(e => e.featured)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess} />
          <RenderItem item={this.props.promotions.promotions.filter(e => e.featured)[0]}
              isLoading={this.props.promotions.isLoading}
              errMess={this.props.promotions.errMess} />
          <RenderItem item={this.props.leaders.leaders.filter(e => e.featured)[0]}
              isLoading={this.props.leaders.isLoading}
              errMess={this.props.leaders.errMess} />
        </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);