import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView, FlatList, ToastAndroid, Linking, TouchableOpacity
  } from 'react-native';
  
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles from '../styles/index.style';
import {Button, Icon} from 'native-base';
import ConfigApp from '../config';
import SparkButton from 'react-native-sparkbutton';

import SendIntentAndroid from 'react-native-send-intent';

const border = 'rgb(232, 229, 215)';

class ListSpecific extends Component {
  render(){
    return(
      <View style={[{flexDirection: 'row'}]}>
        <Text style={[{width: '50%', fontSize: 13, fontWeight: 'bold', borderColor: border, borderWidth: 1, textAlign: 'left', paddingLeft: 14}]}>{this.props.data.title}</Text>
        <Text style={[{width: '50%', fontSize: 13, borderColor: border, borderWidth: 1, textAlign: 'center'}]}>{this.props.data.data}</Text>
      </View>
    )
  }
}


export default class DetailsScreen extends Component {
    constructor(props) {
      super(props);
      this.items = this.props.navigation.state.params;
      this._renderItem = this._renderItem.bind(this);
      this.addtoFav = this.addtoFav.bind(this);
      this.state = {
        checked: false
      }
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.item.title : 'Details',
        tabBarVisible: false,
      };
    };
    
    calltoOwner(){
      SendIntentAndroid.sendPhoneDial(ConfigApp.phone)
    }

    addtoFav(checked){
      ToastAndroid.show("Added to the fav", ToastAndroid.SHORT);
      this.setState({ checked })
    }

    msgtoOwner(){
      Linking.openURL(`whatsapp://send?text=hey I need to ask you about ${this.items.item.title}&phone=${ConfigApp.phone}`)
    }

    _renderItem ({item, index}) {
        return (
          <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate("Imageview", this.items)} >
            <Image source={{uri: item}} key={index} style={[styless.img]} resizeMode='contain' />
          </TouchableOpacity>
        );
    }
    
    layoutExample (number, title, type) {
      return (
          <View style={[styles.exampleContainer,  styles.exampleContainerLight, {width: sliderWidth}]}>
              <Carousel
                data={this.items.item.imgs}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'default'}
              />
          </View>
      );
  }

    render() {
      const imgs = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
      
      let newprice = this.items.item.price-(this.items.item.price*(this.items.item.discount/100));
      let discount = (this.items.item.discount || this.items.item.discount != 0) ? (
        <Text style={[styless.cross, {marginLeft: 5, fontWeight: 'bold', color: 'orange'},  {backgroundColor: 'rgba(255,255,255,0.8)'}]}>
          {this.items.item.discount}% off
        </Text>
      ) : false;
      let cross = (this.items.item.discount || this.items.item.discount != 0) ? (
        <Text style={[styless.cross, {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}, {backgroundColor: 'rgba(255,255,255,0.8)'}]}>
            {this.items.item.price}
        </Text>
      ) : false;

      return (
        <View style={styles.container}>
            <ScrollView
              style={styles.scrollview}
              // scrollEventThrottle={200}
              directionalLockEnabled={true}>
                { imgs }
                <Text style={[styles.title, {backgroundColor: 'rgba(255,255,255,0.8)'}]}>{this.items.item.title}</Text>
                <View style={{paddingTop: 15, paddingBottom: 8, flexDirection: 'row', marginLeft: 0, width: '100%', backgroundColor: 'white', elevation: 3}}>
                  <Text style={[styles.title, {paddingHorizontal: 5},  {backgroundColor: 'rgba(255,255,255,0.8)'}]}>₹{newprice}</Text>
                  {cross}
                  {discount}
                </View>
                <View style={[{marginTop: 10, flexDirection: 'column'}]}>
                  <Text style={[styles.title, {color: 'white'}]}>For More Info Kindly Contact Us</Text>
                </View>
                <View style={[{flex: 1,flexDirection: 'row',justifyContent: 'space-evenly',alignItems: 'center',backgroundColor: 'white', paddingBottom: 8, paddingTop: 5, elevation: 3}]}>
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

                      <Button transparent danger onPress={()=> this.calltoOwner()}>
                        <Icon active name="ios-call" style={styless.icon} />
                      </Button>

                      <Button transparent danger onPress={()=> this.msgtoOwner()}>
                        <Icon active name="logo-whatsapp" style={styless.icon} />
                      </Button>
                </View>
                <Text style={[styles.title, {alignItems: 'flex-start', marginTop: 10, elevation: 3, backgroundColor: 'orange', color: 'white'}]}>Specifications</Text>
                <View style={[styless.specifc, {flexDirection: 'column', elevation: 3}]}>
                  <FlatList
                    data={this.items.item.specific} 
                    renderItem={({item}) => <ListSpecific data={item} />}
                  />
                </View>        
            </ScrollView>
        </View>
      );
    }
  }
  
const styless = StyleSheet.create({
   cross: {
      backgroundColor: 'transparent',
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "#212121",
      fontSize: 11,
      margin: 2,
  },
  specifc: {
    paddingTop: 20,
    backgroundColor: 'white',
    elevation: 3
  },
  icon: {fontSize: 24,},
  stext: {
    margin: 2,
  },
  img: {
     width: 200,
     height: 195,
     flex: 1
  }
});
  