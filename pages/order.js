import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';

import { Content, Card, CardItem, Textarea, Button, 
    Body, Right, Left, Item, Input, 
    Label, List, ListItem, Radio } from 'native-base';
import firebase from 'react-native-firebase';

export default class OrderScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;
      this.product = this.props.navigation.state.params.item;
    //   this.product = this.items.item;
      this.state = {
          name: "", 
          pincode: '', 
          locality: '', 
          city: '', 
          phone: '', 
          address: '',
          page: 0,
          checked: 1,
      };
      if(!firebase.auth().currentUser && global.config>1){
        this.props.navigation.replace("Login", "Order");
      }
      this.getData = this.getData.bind(this);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      const title = params.title;
  
      return {
        title: "Place Order",
        tabBarVisible: false,
      };
    };

    getData(){
        const uid =  (global.config<=1)? "s76aK38yMES6ATnXrFJiZnxhChs2" : firebase.auth().currentUser.uid;
        const addr = {name: this.state.name, pincode: this.state.pincode, locality: this.state.locality, city: this.state.city, address: this.state.address, phone: this.state.phone};
        const order = {id: this.product.id, status: "Ordered Placed", date: new Date().toDateString(), payment: "cod"}
         firebase.database().ref("/orders/"+uid).push(order, (res)=> {
            ToastAndroid.show("Your Order has been placed");
        })
        firebase.database().ref("/user/"+uid+"/address").set(addr, (res)=>{
            this.props.navigation.goBack();
        })
    }

    getInput(){
        return (
            <Body style={[{flexDirection: "column", justifyContent: "space-evenly"}]}>
                            <Item floatingLabel>
                                <Label>Your Name</Label>
                                <Input onChangeText={(txt)=> this.setState({name: txt})} value={this.state.name} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Pincode</Label>
                                <Input onChangeText={(txt)=> this.setState({pincode: txt})} value={this.state.pincode} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Locality</Label>
                                <Input onChangeText={(txt)=> this.setState({locality: txt})} value={this.state.locality} />
                            </Item>
                            <Item floatingLabel>
                                <Label>City/District/Town</Label>
                                <Input onChangeText={(txt)=> this.setState({city: txt})} value={this.state.city} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Phone Number</Label>
                                <Input onChangeText={(txt)=> this.setState({phone: txt})} value={this.state.phone} />
                            </Item>
                            <Item style={[{width: "100%"}]}>
                                <Textarea rowSpan={3} onChangeText={(txt)=> this.setState({address: txt})} value={this.state.address} placeholder="Address" bordered style={[{width: "100%"}]} />
                            </Item>
                        </Body>
        );
    }

    getPayment(){
        return (<Content>
            <ListItem selected={this.state.checked==1?true:false}>
                    <Left>
                    <Text>Cash on Delivery</Text>
                    </Left>
                    <Right>
                    <Radio
                        color={"#f0ad4e"}
                        selectedColor={"#5cb85c"}
                        selected={this.state.checked==1?true:false}
                        onPress={()=>this.setState({checked: 1})}
                    />
                    </Right>
                </ListItem>
                {/* <ListItem selected={this.state.checked==2?true:false}>
                    <Left>
                    <Text>Online Payment</Text>
                    </Left>
                    <Right>
                    <Radio
                        color={"#f0ad4e"}
                        selectedColor={"#5cb85c"}
                        selected={this.state.checked==2?true:false}
                        onPress={()=>this.setState({checked: 2})}
                    />
                    </Right>
                </ListItem> */}
            </Content>);
    }

    

    render() {
    let pic = {uri: this.product.val.msrc};
    let newprice = this.product.val.price-(this.product.val.price*(this.product.val.discount/100));
    let btntxt = "Continue";
    let backbtn = null;
    let subbtn = (<Button style={[{padding: "5%", backgroundColor: "rgb(48, 117, 229)"}]} onPress={()=>this.setState({page: ++i})} >
    <Text style={{color: "white", fontWeight: "500"}}>
        {btntxt}
    </Text>
</Button>);
    let i = 0;
    if(this.state.page == 1){
        backbtn = (<Button transparent onPress={()=>this.setState({page: --i})}><Text>Back</Text></Button>);
        btntxt="Place Order";
        subbtn=(<Button style={[{padding: "5%", backgroundColor: "rgb(48, 117, 229)"}]} onPress={()=>this.getData()} >
        <Text style={{color: "white", fontWeight: "500"}}>
            {btntxt}
        </Text>
    </Button>);
        if(this.state.checked > 1){
            btntxt = "Pay & Place Order";
            subbtn=(<Button style={[{padding: "5%", backgroundColor: "rgb(48, 117, 229)"}]} onPress={()=>this.setState({page: ++i})} >
            <Text style={{color: "white", fontWeight: "500"}}>
                {btntxt}
            </Text>
        </Button>);
        }
    }

      return (
        <View style={[styles.container, {flex: 1}]}>
            <Content>
                <Card>
                    <CardItem header style={[{justifyContent: "center"}]}>
                        <Text style={[{fontWeight: "bold", fontSize: 20}]}>Place Your Order</Text>
                    </CardItem>
                    <CardItem>
                        <TouchableOpacity style={[{borderColor: "rgb(222, 226, 232)", borderWidth: 1, flexDirection: "row"}]}>
                            <Left>
                                <Image source={pic} style={[{width: 200, height: 200}]} resizeMode='contain' />
                            </Left>
                            <Right>
                                <Text style={[{fontWeight: "500", fontSize: 16}]}>{this.product.val.name}</Text>
                            </Right>
                        </TouchableOpacity>
                    </CardItem>
                    <CardItem>
                        {this.state.page>0? this.getPayment(): this.getInput()}
                    </CardItem>
                    <CardItem footer>
                        <Left>
                            <Text style={[{fontSize: 17, fontWeight: "bold"}]}> Price: {newprice.toFixed(2)} </Text>
                        </Left>
                        <Right style={[ this.state.page>0 ? {flexDirection: "row", justifyContent: "space-around"}:{}]}>
                            {backbtn}
                            {subbtn}
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
});
  