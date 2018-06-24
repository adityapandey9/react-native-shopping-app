import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator
  } from 'react-native';

import { Content, Card, CardItem, Textarea, Button, Body, Right, Left, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';

export default class EditScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;

      this.state = {
          name: "", 
          pincode: '', 
          locality: '', 
          city: '', 
          phone: '', 
          address: '',
          list: null,
      };
      if(!firebase.auth().currentUser && global.config>1){
        this.props.navigation.replace("Login", "Edit");
      }
      this.getData = this.getData.bind(this);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: "Edit Info",
        tabBarVisible: false,
      };
    };

    componentWillMount(){
        const uid = "s76aK38yMES6ATnXrFJiZnxhChs2"; //firebase.auth().currentUser.uid;
        firebase.database().ref("/user/"+uid+"/address").once("value", (res)=>{
            let list = res.val();
            this.setState({list});
        }, (err)=>{
            console.error(err);
        })
    }

  
    getData(){
        const uid = "s76aK38yMES6ATnXrFJiZnxhChs2"; //firebase.auth().currentUser.uid;
        const addr = {name: this.state.name, pincode: this.state.pincode, locality: this.state.locality, city: this.state.city, address: this.state.address, phone: this.state.phone};
        firebase.database().ref("/user/"+uid+"/address").push(addr, (res)=> {
            console.error(res);
        }).catch((err)=>{
            console.error("Error: ", err)
        })
    }

    render() {
        if(this.state.list == null){
            return <ActivityIndicator style={{marginTop: "20%"}} />;
        }
      return (
        <View style={[styles.container, {flex: 1}]}>
            <Content>
                <Card>
                    <CardItem header style={[{justifyContent: "center"}]}>
                        <Text style={[{fontWeight: "bold", fontSize: 20}]}>Edit Your Information</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={[{flexDirection: "column", justifyContent: "space-evenly"}]}>
                            <Item floatingLabel>
                                <Label>Your Name</Label>
                                <Input onChangeText={(txt)=> this.setState({name: txt})} value={this.state.list.name} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Pincode</Label>
                                <Input onChangeText={(txt)=> this.setState({pincode: txt})} value={this.state.list.pincode} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Locality</Label>
                                <Input onChangeText={(txt)=> this.setState({locality: txt})} value={this.state.list.locality} />
                            </Item>
                            <Item floatingLabel>
                                <Label>City/District/Town</Label>
                                <Input onChangeText={(txt)=> this.setState({city: txt})} value={this.state.list.city} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Phone Number</Label>
                                <Input onChangeText={(txt)=> this.setState({phone: txt})} value={this.state.list.phone} />
                            </Item>
                            <Item style={[{width: "100%"}]}>
                                <Textarea rowSpan={3} onChangeText={(txt)=> this.setState({address: txt})} placeholder="Address" value={this.state.list.address} bordered style={[{width: "100%"}]} />
                            </Item>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Body>
                            <Button style={[{padding: "5%", backgroundColor: "rgb(48, 117, 229)"}]} onPress={()=>this.getData()} >
                                <Text style={{color: "white", fontWeight: "500"}}>
                                    Save the change
                                </Text>
                            </Button>
                        </Body>
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
  