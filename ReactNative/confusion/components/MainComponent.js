import React, { Component } from 'react';
import { View, Platform, Image, StyleSheet, ScrollView, NetInfo, ToastAndroid } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon, Text } from 'react-native-elements';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

const defaultNavigationOptions = ({
  headerStyle: {
    backgroundColor: '#512DA8'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff'
  }
});

const mainNavigationOptions = ({ navigation }) => ({
  ...defaultNavigationOptions,
  headerLeft: <Icon name='menu' size={24} color='white'
      onPress={() => navigation.toggleDrawer()} />
});

const createDrawerNavigationOptions = ({ title, iconName, iconSize = 24 }) => ({
  title: title,
  drawerLabel: title,
  drawerIcon: ({ tintColor }) => (
      <Icon name={iconName} type='font-awesome' size={iconSize} color={tintColor} />
  )
});


const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: mainNavigationOptions
  },
  Dishdetail: {
    screen: Dishdetail
  }
}, {
  initialRouteName: 'Menu',
  navigationOptions: defaultNavigationOptions
});

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: mainNavigationOptions
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
  navigationOptions: mainNavigationOptions
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: mainNavigationOptions
});

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
  navigationOptions: mainNavigationOptions
});

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, {
  navigationOptions: mainNavigationOptions
});

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: mainNavigationOptions
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./images/logo.png')}
                style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Login: {
    screen: LoginNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'Login', iconName: 'sign-in' })
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'Home', iconName: 'home' })
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'About Us', iconName: 'info-circle' })
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'Menu', iconName: 'list' })
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'Contact Us', iconName: 'address-card', iconSize: 22 })
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'My Favorites', iconName: 'heart' })
  },
  Reservation: {
    screen: ReservationNavigator,
    navigationOptions: createDrawerNavigationOptions({ title: 'Reserve Table', iconName: 'cutlery' })
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.getConnectionInfo()
        .then(info => ToastAndroid.show(
            'Initial Network Connectivity Type: ' + info.type
            + ', effectiveType: ' + info.effectiveType,
            ToastAndroid.LONG));
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (info) => {
    switch (info.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You have an unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  };

  render() {
    return (
        <View style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }}>
          <MainNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(null, mapDispatchToProps)(Main);