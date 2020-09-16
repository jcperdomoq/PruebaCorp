import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import  {icons} from '../../util/icons';

class CurrentTime extends Component {

  render() {

    const {temperature, apparentTemperature, temperatureLow, temperatureHigh, summary, icon, summaryHours, windSpeed, humidity, dewPoint} = this.props.currentlyData;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10, marginHorizontal: 20}}>
          <Text style={{color: 'white'}}>
            Wind: <Text style={{color: '#CCC'}}>{windSpeed} mph</Text>
          </Text>
          <Text style={{color: 'white'}}>
            Humidity: <Text style={{color: '#CCC'}}>{humidity}%</Text>
          </Text>
          <Text style={{color: 'white'}}>
            Dew Pt: <Text style={{color: '#CCC'}}>{dewPoint}°</Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name={icons[icon.replace(/-/g, '')]} size={40} color="white" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.timeLabel}>{temperature}° {summary}.</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.temperature}>Feels like: <Text style={{color: '#CCC'}}>{apparentTemperature}°</Text></Text>
              <Text style={styles.temperature}>Low: <Text style={{color: '#CCC'}}>{temperatureLow}°</Text></Text>
              <Text style={styles.temperature}>Hight: <Text style={{color: '#CCC'}}>{temperatureHigh}°</Text></Text>
            </View>
          </View>
        </View>
        <Text style={styles.timeHours}>{summaryHours}</Text>
      </View>
    );
  }
}
export default CurrentTime;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    maxWidth: 200,
    color: 'white',
  },
  timeHours: {
    width: '80%',
    fontSize: 30,
    fontWeight: '300',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  temperature: {
    color: 'white',
    paddingLeft: 4,
  },
});
