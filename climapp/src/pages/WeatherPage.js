import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {getWeather} from './../api';
import CurrentTime from './widgets/CurrentTime';
import HourTime from './widgets/HourTime';
import WeekTime from './widgets/WeekTime';

class WeatherPage extends Component {

  state = {
    currentlyData: null,
    hourlyData: null,
    dailyData: null,
  }

  componentDidMount() {
    const location = this.props.route.params.location;
    this.loadWeather({location});
  }

  loadWeather = async ({location}) => {
    const {lat, lng} = location;
    const response = await getWeather({
      lat,
      lng,
    });

    if (response != null && response.currently != null) {
      this.setState({
        currentlyData: response.currently,
        hourlyData: response.hourly,
        dailyData: response.daily,
      });
      console.log({response});
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {this.state.currentlyData == null && this.state.hourlyData == null && this.state.dailyData == null &&
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>}

        {this.state.currentlyData != null &&
        <CurrentTime
          currentlyData={this.state.currentlyData}
        />}
        {this.state.hourlyData != null &&
        <View style={{flexDirection: 'row', marginTop: 30, marginRight: 10, alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.swipeStyle}>
            Swipe
          </Text>
          <Icon name="long-arrow-right" color="#FFF" size={30} />
        </View>}
        {this.state.hourlyData != null &&
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{maxHeight: 100}} >
          <HourTime
            initial
            hourlyData={this.state.hourlyData.splice(0, 11)} />
          {this.state.hourlyData.length >= 11 &&
          <HourTime
            hourlyData={this.state.hourlyData.splice(0, 11)} />}
          {this.state.hourlyData.length >= 11 &&
          <HourTime
            hourlyData={this.state.hourlyData.splice(0, 11)} />}
          {this.state.hourlyData.length >= 11 &&
          <HourTime
            hourlyData={this.state.hourlyData.splice(0, 11)} />}
          {this.state.hourlyData.length >= 11 &&
          <HourTime
            hourlyData={this.state.hourlyData.splice(0, 11)} />}
        </ScrollView>}

        {this.state.dailyData != null &&
        <WeekTime
          dailyData={this.state.dailyData} />}
      </SafeAreaView>
    );
  }
}
export default WeatherPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  swipeStyle: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 18,
    color: '#FFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
