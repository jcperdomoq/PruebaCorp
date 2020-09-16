import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import SearchPage from './src/pages/SearchPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherPage from './src/pages/WeatherPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="WeatherPage" component={WeatherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
