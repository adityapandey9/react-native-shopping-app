import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
  } from 'react-native';
  
import ConfigApp from '../config';

export default class AboutScreen extends Component {
    constructor(props) {
      super(props);
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
    }

    static navigationOptions = {
      title: 'About Your Shop',
      headerLeft: null
    };
  
    render() {
      let pic = {
        uri: 'https://firebasestorage.googleapis.com/v0/b/shop-744dd.appspot.com/o/splash.png?alt=media&token=1fca951a-cc3a-49b3-85dc-2e7e5a2f98c1'
      };
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to {ConfigApp.name}!
          </Text>
          <View style={[{flexDirection: 'column', marginTop: 10, alignItems: 'center'}]}>
            <Image source={pic} style={[{width: 200, height: 200, flex: 2}]} />
            <Text style={[styles.content]}>This is Our Shop, we sell electronic and many other parts that you use in your home. We also build pipes.
            This is Our Shop, we sell electronic and many other parts that you use in your home. We also build pipes.
            This is Our Shop, we sell electronic and many other parts that you use in your home. We also build pipes.
            </Text>
          </View>
        </ScrollView>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    content: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      marginTop: 10,
    },
    item: {
      flex: 1,
      height: 260,
      margin: 5
    },
    list: {
      flex: 1
    }
});
  