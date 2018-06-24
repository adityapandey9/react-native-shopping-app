import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
  } from 'react-native';
  

export default class ListLayout extends Component {
  render(){
    return (
      <View style={[styles.list]}>
            <Text>{this.props.title}</Text>
            <ScrollView style={[{flexDirection: "row"}]}
              horizontal= {true}
              decelerationRate={0}
              snapToInterval={this.props.width} //your element width
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}
            >
              {this.props.children}
            </ScrollView>
          </View>
    );
  }
}

const styles = StyleSheet.create({
    list: {
      flexDirection: "column",
      // borderColor: "red",
      // borderWidth: 2,
    },
});