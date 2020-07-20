/* eslint-disable react/jsx-filename-extension,react/style-prop-object,global-require */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import Apps from './src/main';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends React.Component {
  componentDidMount = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Apps />
      </View>
    );
  }
}
