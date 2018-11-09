import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import { SecureStore, Permissions, ImagePicker, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {
  static navigationOptions = {
    title: 'LoginTab',
    tabBarIcon: ({ tintColor }) => (
        <Icon name='sign-in'
            type='font-awesome'
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
        .then(userdata => {
          const userinfo = JSON.parse(userdata);
          if (userinfo) {
            this.setState({
              username: userinfo.username,
              password: userinfo.password,
              remember: true
            });
          }
        });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));

    if (this.state.remember) {
      SecureStore.setItemAsync('userinfo',
          JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
      ).catch(error => console.log('Could not save user info', error));
    } else {
      SecureStore.deleteItemAsync('userinfo')
          .catch(error => console.log('Could not delete user info', error));
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Input placeholder='Username'
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              containerStyle={styles.formInput}
          />
          <Input placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              containerStyle={styles.formInput}
          />
          <CheckBox title='Remember Me'
              center
              checked={this.state.remember}
              onPress={() => this.setState({ remember: !this.state.remember })}
              containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button title='Login'
                icon={<Icon name='sign-in' type='font-awesome' color='white' size={24} />}
                onPress={() => this.handleLogin()}
                buttonStyle={{ backgroundColor: '#512da8' }}
            />
          </View>
          <View style={styles.formButton}>
            <Button title='Register'
                titleStyle={{ color: 'blue' }}
                clear
                color='#512da8'
                icon={<Icon name='user-plus' type='font-awesome' color='blue' size={24} />}
                onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
    );
  }
}

class RegisterTab extends Component {
  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
        <Icon name='user-plus'
            type='font-awesome'
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    };
  }

  handleRegister() {
    console.log(JSON.stringify(this.state));

    if (this.state.remember) {
      SecureStore.setItemAsync('userinfo',
          JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
      ).catch(error => console.log('Could not save user info', error));
    }
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };

  getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri)
            .catch(error => console.error(error));
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(imageUri,
        [
          { resize: { width: 400 } }
        ],
        { format: 'png' }
    );
    this.setState({ imageUrl: processedImage.uri });
  };

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: this.state.imageUrl }}
                  loadingIndicatorSource={require('./images/logo.png')}
                  style={styles.image}
              />
              <Button title='Camera' onPress={this.getImageFromCamera} />
              <Button title='Gallery' onPress={this.getImageFromGallery} />
            </View>
            <Input placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
                containerStyle={styles.formInput}
            />
            <Input placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                containerStyle={styles.formInput}
            />
            <Input placeholder='Firstname'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={firstname => this.setState({ firstname })}
                value={this.state.firstname}
                containerStyle={styles.formInput}
            />
            <Input placeholder='Last Name'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={lastname => this.setState({ lastname })}
                value={this.state.lastname}
                containerStyle={styles.formInput}
            />
            <Input placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                containerStyle={styles.formInput}
            />
            <CheckBox title='Remember Me'
                center
                checked={this.state.remember}
                onPress={() => this.setState({ remember: !this.state.remember })}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
              <Button title='Register'
                  icon={<Icon name='user-plus' type='font-awesome' color='white' size={24} />}
                  onPress={() => this.handleRegister()}
                  buttonStyle={{ backgroundColor: '#512da8' }}
              />
            </View>
          </View>
        </ScrollView>
    );
  }
}

const Login = createBottomTabNavigator({
  Login: LoginTab,
  Register: RegisterTab
}, {
  tabBarOptions: {
    activeBackgroundColor: '#9575cd',
    inactiveBackgroundColor: '#d1c4e9',
    activeTintColor: 'white',
    inactiveTintColor: 'gray'
  }
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  },
  formInput: {
    margin: 10
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null
  },
  formButton: {
    margin: 30
  }
});

export default Login;