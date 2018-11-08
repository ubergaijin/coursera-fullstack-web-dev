import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  loadingText: {
    color: '#512da8',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export const Loading = () => (
    <View style={styles.loadingView}>
      <ActivityIndicator size='large' color='#512da8' />
      <Text styles={styles.loadingText}>Loading...</Text>
    </View>
);

export const Loader = ({ children, isLoading, errMess }) => {
  if (isLoading) {
    return (
        <Loading />
    );
  } else if (errMess) {
    return (
        <View>
          <Text>{errMess}</Text>
        </View>
    );
  } else {
    return children;
  }
};
