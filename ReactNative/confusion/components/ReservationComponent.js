import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';

class Reservation extends Component {
  static navigationOptions = {
    title: 'Reserve Table'
  };

  static async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notification');
      }
    }
    return permission;
  }

  static async presentLocalNotification(date) {
    await Reservation.obtainNotificationPermission();

    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      ios: {
        sound: true
      },
      android: {
        channelId: 'reservation',
        color: '#512da8'
      }
    }).catch(error => console.error(error));
  }

  static async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to access calendar');
      }
    }
    return permission;
  }

  static async addReservationToCalendar(date) {
    const startDate = new Date(Date.parse(date));
    const endDate = new Date(Date.parse(date) + 2 * 60 * 60 * 1000);

    await Reservation.obtainCalendarPermission();

    Calendar.createEventAsync(Calendar.DEFAULT, {
      title: 'Con Fusion Table Reservation',
      startDate: startDate,
      endDate: endDate,
      timeZone: 'Asia/Hong_Kong',
      location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    }).catch(error => console.error(error));
  }

  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: ''
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reservation', {
        name: 'Reservation',
        sound: true,
        vibrate: true
      });
    }
  }

  handleReservation() {
    Alert.alert(
        'Your Reservation OK?',
        `Number of Guests: ${this.state.guests}\nSmoking? ${this.state.smoking ? 'Yes' : 'No'}\nDate and Time: ${this.state.date}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => this.resetForm()
          },
          {
            text: 'OK',
            onPress: () => {
              Reservation.presentLocalNotification(this.state.date)
                  .catch(error => console.error(error));
              Reservation.addReservationToCalendar(this.state.date)
                  .catch(error => console.error(error));
              this.resetForm();
            }
          }
        ],
        { cancelable: false }
    );
  }

  resetForm() {
    this.setState({
      guest: 1,
      smoking: false,
      date: ''
    });
  }

  render() {
    return (
        <Animatable.View animation='zoomIn' duration={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker style={styles.formItem}
                selectedValue={this.state.guests}
                onValueChange={val => this.setState({ guests: val })}>
              <Picker.Item label='1' value={1} />
              <Picker.Item label='2' value={2} />
              <Picker.Item label='3' value={3} />
              <Picker.Item label='4' value={4} />
              <Picker.Item label='5' value={5} />
              <Picker.Item label='6' value={6} />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch style={styles.formItem}
                value={this.state.smoking}
                trackColor={{ true: '#512da8' }}
                thumbColor='#512da8'
                onValueChange={val => this.setState({ smoking: val })} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker style={{ flex: 2, marginRight: 20 }}
                date={this.state.date}
                format=''
                mode='datetime'
                placeholder='select date and time'
                minDate='2017-01-01'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={date => this.setState({ date: date })}
            />
          </View>
          <View style={styles.formRow}>
            <Button title='Reserve' color='#512da8'
                onPress={() => this.handleReservation()}
                accessibilityLabel='Learn more about this purple button' />
          </View>
        </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512da8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default Reservation;