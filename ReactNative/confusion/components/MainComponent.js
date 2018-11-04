import * as React from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Menu from './MenuComponent';
import Dishdetail from "./DishdetailComponent";

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
});

class Main extends React.Component {

  render() {
    return (
        <View style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }}>
          <MenuNavigator />
        </View>
    );
  }
}

export default Main;