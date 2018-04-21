import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native'

export default class Layout extends Component {
  constructor(props){
    super(props);

  }

    render() {
      return (
        <View style={this.props.styles}>
          <ScrollView style={styles.main}>
            {this.props.children}
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 0.1,
    shadowColor: 'red',
    shadowOffset: {
      width: 13,
      height: 13
    },
    shadowRadius: 15,
    shadowOpacity: 1.0
  },
  main: {
    flex: 2,
    marginBottom: 2,
  }
});