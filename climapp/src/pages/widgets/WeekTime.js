import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {icons} from '../../util/icons';

class WeekTime extends Component {


  renderDay = (day, index) => {
    const {time, temperatureMin, temperatureMax, icon} = day;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayTime = (new Date(time * 1000)).getDay();

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
        <Icon name={icons[icon.replace(/-/g, '')]} light color="white" size={25} style={styles.icon} />
        <Text
          style={styles.dayLabel}>
          {index == 0 ? 'Today' : days[dayTime]}
        </Text>
        <Text
          style={styles.dayLabel}>
          <Text style={{color: '#CCC'}}>{temperatureMin}°</Text>
        </Text>
        <View style={{height: 15, width: temperatureMax + 40, marginHorizontal: 5, borderRadius: 5, backgroundColor: 'white'}} />
        <Text
          style={[styles.dayLabel, {flex: 1}]}>
          <Text style={{color: '#CCC'}}>{temperatureMax}°</Text>
        </Text>
        <Icon name="plus-circle" light color="#CCC" size={18} style={{marginRight: 30}} />
      </View>
    );
  }

  render() {
    const {summary, data} = this.props.dailyData;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{summary}</Text>

        {data && data.length > 0 &&
        <FlatList
          ref={ref => this.list = ref}
          keyboardShouldPersistTaps="always"
          renderItem={({ item, index }) => this.renderDay(item, index)}
          data={data}
          style={{}}
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={(item, index) => `${index}`}
        />}
      </View>
    );
  }
}
export default WeekTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#CCC',
    fontWeight: '200',
    fontSize: 24,
  },
  dayLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  icon: {
    marginLeft: 20,
    marginRight: 10,
  },
});
