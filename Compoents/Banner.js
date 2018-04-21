import React, { Component } from 'react';
import { Content, Card, CardItem, Icon, Button, Body, Right, Left } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert
  } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';


export default class Banner extends Component {
    constructor(props){
      super(props);
      
    }

    onPressButton(val) {
        Alert.alert('You tapped the CardView!: ', this.props.data.item.title)
        // SendIntentAndroid.sendText({
        //   title: 'Please share this text',
        //   text: 'Lorem ipsum dolor sit amet, per error erant eu, antiopam intellegebat ne sed',
        //   type: SendIntentAndroid.TEXT_PLAIN
        // });
    }

    render(){
      return (
        <TouchableHighlight onPress={() => this.onPressButton(this.props)} underlayColor="white">
        <Content style={this.props.styles}>
          <Card>
            <CardItem cardBody style={styles.items}>
              <Image source={{uri: this.props.data.item.img}} style={styles.img} resizeMode='contain' />
            </CardItem>
            <CardItem style={styles.upper}>
              <Body>
                <Text style={{fontSize: 14, fontWeight: "700"}} numberOfLines={2}>
                  {this.props.data.item.title}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        </TouchableHighlight>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    height: 14,
    alignItems: 'center',
    marginBottom: 5,
  },
  upper: {
    marginBottom: -4,
  },
  icon: {fontSize: 30,},
  item: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'orange',
    position: 'relative',
    margin: 10
  },
  img: {
    marginTop: 3,
    flex: 1,
    height: 170,
    width: 170,
  }
});
  