import React, { Component } from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loader } from './LoadingComponent';

const mapStateToProps = (state) => ({
  leaders: state.leaders
});

const History = () => (
    <Card title='Our History'>
      <Text style={{ margin: 10 }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
      <Text style={{ margin: 10 }}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
    </Card>
);

class About extends Component {
  static navigationOptions = {
    title: 'About Us'
  };

  render() {
    const renderLeaderItem = ({ item, index }) => (
        <ListItem key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            leftAvatar={{ source: { uri: baseUrl + item.image } }} />
    );

    return (
        <ScrollView>
          <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
            <History />
            <Card title='Corporate Leadership'>
              <Loader isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}>
                <FlatList data={this.props.leaders.leaders}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()} />
              </Loader>
            </Card>
          </Animatable.View>
        </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);