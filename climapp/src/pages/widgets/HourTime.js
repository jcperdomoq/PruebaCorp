import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
class HourTime extends Component {

  renderSideBarHour = (data) => {
    let hoursData = [];
    let count = 0;
    data.map(hourData => {
      const {temperature, time} = data[count];

      const hour = (new Date(time * 1000)).getHours();
      const anteMeridiem = hour > 12 ? 'pm' : 'am';
      let hourMeridiem = hour > 12 ? hour - 12 : hour;
      hourMeridiem = hourMeridiem == 0 ? 12 : hourMeridiem;

      if (count < 11) {
        if (count % 2 == 0) {
          hoursData.push(
            <View key={count} style={{alignItems: 'center'}}>
              <View style={styles.pin} />
              <Text style={{color: '#CCC'}}>{count == 0 && this.props.initial ? 'Now' : `${hourMeridiem}${anteMeridiem}`}</Text>
              <Text style={{color: '#ADADAD', fontSize: 16, fontWeight: '300'}}>{temperature}°</Text>
            </View>
          );
        } else {
          hoursData.push(
            <View key={count} style={{alignItems: 'center'}}>
              <View style={styles.pin} />
            </View>
          );
        }
      }
      count++;
    });
    return hoursData;
  }

  calculateTimePeerIntervals = (data) => {
    let intervals = [{
      summary: data[0].summary,
      count: 1,
    }];

    for (let i = 1; i < 11; i++) {
      if (intervals[intervals.length - 1].summary == data[i].summary) {
        // intervals[data[i].summary] += 1;
        intervals[intervals.length - 1].count += 1;
      } else {
        // intervals[data[i].summary] = 1;
        intervals.push({
          summary: data[i].summary,
          count: 1,
        });
      }
    }
    return intervals;
  }

  hexToRgb = (hex) => {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    let bigInt = parseInt(hex, 16);
    let r = (bigInt >> 16) & 255;
    let g = (bigInt >> 8) & 255;
    let b = bigInt & 255;

    return [r, g, b].join();
  };

  getBrightness = (r, g, b) => {
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  renderPercentData = (percentData, numPoints) => {
    let percentViews = [];
    for (let i = 0; i < percentData.length; i++) {
      const widthBar = Math.round(percentData[i].count / numPoints * 100);
      const colorBar = `#${percentData[i].count}C${percentData[i].count}C${percentData[i].count}C`;
      let rgb = colorBar && colorBar != '' ? this.hexToRgb(colorBar).split(',') : null;
      let brightness = rgb != null ? this.getBrightness(rgb[0], rgb[1], rgb[2]) : null;
      percentViews.push(
        <View key={i}
          style={{
            borderTopLeftRadius: i == 0 ? 5 : 0,
            borderBottomLeftRadius: i == 0 ? 5 : 0,
            borderBottomRightRadius: i == percentData.length - 1 ? 5 : 0,
            borderTopRightRadius: i == percentData.length - 1 ? 5 : 0,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorBar,
            width: `${widthBar}%`,
          }}>
          {widthBar > 10 &&
          <Text numberOfLines={2} style={{paddingHorizontal: 4, color: brightness < 100 ? '#FFF' : '#000'}}>{percentData[i].summary}</Text>}
        </View>
      );
    }
    return percentViews;
  }

  render() {
    const data = this.props.hourlyData;
    const percentData = this.calculateTimePeerIntervals(data);
    return (
      <View style={styles.container}>
        <View style={styles.timeBar}>
          {this.renderPercentData(percentData, 11)}
        </View>
        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
          {this.renderSideBarHour(data)}
        </View>
      </View>
    );
  }
}
export default HourTime;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 100,
    alignItems: 'center',
  },
  timeBar: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 8,
    width: '90%',
    backgroundColor: '#CCC',
  },
  pin: {
    width: 1,
    height: 8,
    backgroundColor: '#ADADAD',
  }
});
