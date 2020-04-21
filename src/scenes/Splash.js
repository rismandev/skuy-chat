import React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import styles from '../styles';

const SplasScreen = () => {
  return (
    <View style={[styles.Flex1, styles.Center, styles.bgWhite]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={require('../assets/images/icon_splash.png')}
        style={Styles.Image}
      />
      <Text style={Styles.Logo}>SkuyChat</Text>
    </View>
  );
};

export default SplasScreen;

const Styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  Logo: {
    fontSize: 24,
    color: '#00AF80',
    fontFamily: 'Roboto-Black',
  },
});
