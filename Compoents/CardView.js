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
import SparkButton from 'react-native-sparkbutton';
import firebase from 'react-native-firebase';

export default class CardView extends Component {
    constructor(props){
      super(props);
      this.state = {
        checked: false
      }
      this.addtoFav = this.addtoFav.bind(this);
      this.getStatus = this.getStatus.bind(this);
      this.cancelOrder = this.cancelOrder.bind(this);
      // console.log(this.props.data)
      this.product = this.props.type ? this.props.data.data : this.props.data;
      const aid = this.props.type ? this.props.data.data.key : this.props.data.key;
      this.mkey = ''+aid;
      // ToastAndroid.show("V: "+this.props.focus, ToastAndroid.SHORT);
      global.storage.load({
        key: 'wishlist',
        id: this.mkey
      }).then(ret => {
        this.setState({checked: true})
      }).catch(err=>{
      });
    }

    calltoOwner(){
      this.props.funcs("Order", this.product);
    }

    addtoFav(checked){
      if(this.state.checked){
        global.storage.remove({
          key: 'wishlist',
          id:this.mkey,
        });
        this.setState({checked: false})
        if(this.props.type)
          this.props.pops(this.mkey);
        return;
      }
      global.storage.save({
        key: 'wishlist',  // Note: Do not use underscore("_") in key!
	      id: this.mkey,	  // Note: Do not use underscore("_") in id!	
	      data: {data: this.product, date: new Date().toDateString()},
	      expires: null,
      });
      this.setState({checked})
    }

    cancelOrder(){
      const uid =  (global.config<=1)? "s76aK38yMES6ATnXrFJiZnxhChs2" : firebase.auth().currentUser.uid;
      firebase.database().ref("/orders/"+uid+"/"+this.product.ordkey).update({status: "Cancelled"}, (res)=>{
        ToastAndroid.show("Your Order has been cancelled", ToastAndroid.SHORT);
      })
    }

    getStatus(){
      let timetext = false;
      let left = false;
      let etime = null;
      let cancel = null;
      //If it is wishlist
      if(this.props.type == 2){
        timetext = "Wishlist"
        etime = this.props.data.date;
        left = (<View>
              <Button transparent onPress={()=>this.addtoFav(this.state.checked)}>
                <Icon name="ios-close" style={[{fontWeight: 'bold', fontSize: 50}]} />
              </Button>
          </View>);
      } else {
        timetext = "Ordered";
        etime = this.props.data.data.date;
        left = (<View>
                <Text style={{fontWeight: "bold"}}>
                  Status: 
                </Text>
                <Text>
                  {this.props.data.data.status}
                </Text>
          </View>);
        if(this.product.status != "Cancelled"){
          cancel = (<Body>
            <Button transparent onPress={()=>this.cancelOrder()}>
              <Text>Cancel Order</Text>
            </Button>
          </Body>);
        }
      }
      return (
        <CardItem>
              <Left>
                {left}
              </Left>
              {cancel}
              <Right>
                <Text style={{fontWeight: "bold"}}>
                  {timetext} Time:
                </Text>
                <Text>
                  {etime}
                </Text>
              </Right>
            </CardItem>
      );
    }

    render(){
      // if(this.props.type)
        // console.error(this.props.data)
      let product =  this.props.type ? this.props.data.data.val : this.props.data.val;
      let status = this.props.type ? this.getStatus(): false;
      if(product == null)
        console.error(product, this.props.data)
      // if(this.props.tre)
        // console.error(product, this.props.data)
      let price = product.price+"";
      price = parseInt(price.replace(/\D/g,''));
      let newprice = price-(price*(product.discount/100));
      newprice = newprice.toFixed(2);
      let discount = (product.discount || product.discount != 0) ? (
        <Text style={{marginLeft: 5, fontWeight: 'bold', color: 'orange'}}>
          {product.discount}% off
        </Text>
      ) : false;
      let cross = (product.discount || product.discount != 0) ? (
        <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
            {price}
        </Text>
      ) : false;

      return (
        <View style={[this.props.styles, this.props.style, {paddingBottom: 0}, {padding: 0, marginBottom: -5, marginTop: -5, marginLeft: -5, elevation: 0}]}>
          <Card padding={10} paddingLeft={14} margin={-1} elevation={0} transparent>
            <CardItem cardBody>
              <Image source={{uri: product.msrc}} style={styles.img} resizeMode='contain' />
            </CardItem>
            <CardItem style={styles.upper}>
              <Body>
                <Text style={{fontSize: 10, fontWeight: "700"}} numberOfLines={2}>
                  {product.name}
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
                  <Icon active name="ios-cart" style={styles.icon} />
                </Button>
              </Right>
            </CardItem>
            {status}
          </Card>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    alignItems: 'center',
    paddingBottom: 3,
  },
  upper: {
    marginBottom: -4,
  },
  icon: {fontSize: 20,},
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
  