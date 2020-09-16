import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {locationSearch} from '../api';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class SearchPage extends Component {

  state = {
    value: '',
    isLoading: false,
    locations: [],
  }

  onChangeText = (value) => {
    this.setState({value});

    setTimeout(async () => {
      if (this.state.value == value) {
        this.setState({isLoading: true});
        const response = await locationSearch({query: value});
        this.setState({isLoading: false});
        if (response != null) {
          this.setState({locations: response});
        }
      }
    }, 500);
  }

  onItemSelect = (item) => {
    this.setState({
      locations: [],
      value: '',
    });
    this.props.navigation.push('WeatherPage', {
      location: item,
    });
  }

  renderLocation = (item, index) => {
    const isLast = index == this.state.locations.length - 1;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.onItemSelect(item)} style={{height: 50, marginLeft: 20, paddingRight: 20, borderColor: '#6A6868', borderBottomWidth: isLast ? 0 : 1, justifyContent: 'center'}}>
        <Text numberOfLines={2} allowFontScaling={false} style={{fontSize: 18, color: 'white'}}>{item.place}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>WeatherApp</Text>
          <View style={styles.containerInput}>
            <Icon name="search" size={24} color="#DCDCDC" style={styles.iconStyle} />
            <TextInput
              value={this.state.value}
              ref={ref => this.searchInput = ref}
              style={styles.inputStyle}
              onChangeText={(text) => this.onChangeText(text)}
              placeholder={'Buscar ubicación'}
            />
            {this.state.isLoading &&
            <ActivityIndicator size="small" style={styles.loadingIndicator} color="#2B2B2B" />}
          </View>
          {this.state.locations && this.state.locations.length > 0 &&
          <FlatList
            ref={ref => this.list = ref}
            keyboardShouldPersistTaps="always"
            renderItem={({ item, index }) => this.renderLocation(item, index)}
            data={this.state.locations}
            style={{maxHeight: 300}}
            contentContainerStyle={{marginTop: 10, paddingBottom: 20}}
            keyExtractor={(item, index) => `${index}`}
          />}
        </SafeAreaView>
      </TouchableOpacity>
    );
  }
}
export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#383838',
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  containerInput: {
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5F7',
  },
  iconStyle: {
    marginLeft: 10,
  },
  inputStyle: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
    marginLeft: 10,
    color: '#848A93',
    fontSize: 16 / PixelRatio.getFontScale(),
  },
  loadingIndicator: {
    height: 26,
		borderRadius: 4,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		paddingHorizontal: 4,
		right: 4,
		position: 'absolute',
		justifyContent: 'center',
  },
});
