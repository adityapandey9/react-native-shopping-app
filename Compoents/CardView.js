import React, { Component } from 'react';
import { Content, Card, CardItem, Icon, Button, Body, Right, Left } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid
  } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import ConfigApp from '../config';
import SparkButton from 'react-native-sparkbutton';

export default class CardView extends Component {
    constructor(props){
      super(props);
      this.state = {
        checked: false
      }
      this.addtoFav = this.addtoFav.bind(this);
    }

    calltoOwner(){
      SendIntentAndroid.sendPhoneDial(ConfigApp.phone)
    }

    addtoFav(checked){
      ToastAndroid.show("Added to the fav", ToastAndroid.SHORT);
      this.setState({ checked })
    }

    render(){
      let newprice = this.props.data.item.price-(this.props.data.item.price*(this.props.data.item.discount/100));
      let discount = (this.props.data.item.discount || this.props.data.item.discount != 0) ? (
        <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'orange'}}>
          {this.props.data.item.discount}% off
        </Text>
      ) : false;
      let cross = (this.props.data.item.discount || this.props.data.item.discount != 0) ? (
        <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
            {this.props.data.item.price}
        </Text>
      ) : false;

      return (
        <TouchableHighlight underlayColor="white" activeOpacity={1} onPress={()=>this.props.funcs("Details", this.props.data)}>
        <Content style={this.props.styles}>
          <Card>
            <CardItem cardBody>
              <Image source={{uri: this.props.data.item.img}} style={styles.img} resizeMode='contain' />
            </CardItem>
            <CardItem style={styles.upper}>
              <Body>
                <Text style={{fontSize: 10, fontWeight: "700"}} numberOfLines={2}>
                  {this.props.data.item.title}
                </Text>
                <View style={{flexDirection: 'row', marginLeft: 0}}>
                  <Text style={{marginRight: 5, fontWeight: 'bold'}}>
                    ₹{newprice}
                  </Text>
                  {cross}
              </View>
              {discount}
              </Body>
            </CardItem>
            <CardItem style={styles.container}>
              <Left>
                <SparkButton        
                  style={{ width: 28, height: 28, overflow: 'visible' }}
                  activeImageSrc={require('../assets/heart-filled.png')}
                  activeImageTint={'orange'}
                  inactiveImageTint={'rgba(255,255,255,0.8)'}
                  inactiveImageSrc={require('../assets/heart.png')}
                  primaryColor={"yellow"}
                  secondaryColor={"red"}
                  animationSpeed={1}
                  checked={this.state.checked}
                  onCheckedChange={this.addtoFav} />
              </Left>
              
              <Right>
                <Button transparent danger onPress={()=> this.calltoOwner()}>
                  <Icon active name="ios-call" style={styles.icon} />
                </Button>
              </Right>
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
    height: 140,
    width: 140,
  }
});
  