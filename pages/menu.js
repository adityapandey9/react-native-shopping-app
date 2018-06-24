import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
  } from 'react-native';
  
import firebase from 'react-native-firebase';
import { Icon, Button } from 'native-base';

export default class MenuScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {login: (firebase.auth().currentUser)?true:false}
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((res)=>{
        this.setState({login: (firebase.auth().currentUser)?true:false});
      })
    }

    signOut(){
      firebase.auth().signOut();
      this.setState({login: false});
      global.storage.remove({key: "login"});
    }
  
    render() {
      let authbtn = false;
      if(this.state.login){
        authbtn = (<Button block danger onPress={()=>this.signOut()}>
        <Text>Sign Out</Text>
      </Button>);
      } else {
        authbtn = (<Button block danger onPress={()=>this.props.navigate("Login")}>
        <Text>Login</Text>
      </Button>);
      }
      return (
        <View style={[{flex: 1, flexDirection: "column", backgroundColor: "white"}]}>
          <View style={[styles.container, {flexDirection: 'row', height: "10%"}]}>
            <TouchableHighlight onPress={()=> this.props.navigate("List", {title: 0})} style={[{borderRadius: 5, backgroundColor: "rgb(232, 80, 46)", flex: 1, width: "50%", elevation: 3}]}>
              <View style={{ flexDirection: "column", paddingTop: "5%", alignItems: "center"}}>
              <Icon name="ios-cart" style={[styles.Icon]} />
              <Text style={[{fontSize: 15, color: "white"}]}>
                My Order
              </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.props.navigate("List", {title: 1})} style={[{borderRadius: 5, backgroundColor: "rgb(198, 146, 81)", elevation: 3, flex: 1, width: "50%",}]}>
              <View style={{ flexDirection: "column", paddingTop: "5%", alignItems: "center"}}>
              <Icon name="ios-heart" style={[styles.Icon]} />
              <Text style={[{fontSize: 15, color: "white"}]}>
                My Wishlist
              </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={[{flex: 2,  borderColor: 4, borderColor: "blue", height: "60%"}]}>
              <Image source={{uri: "http://www.gifmania.co.uk/Objects-Animated-Gifs/Animated-Home/Shopping-Carts/Puppy-With-Cart-90319.gif" }} style={[{width: "100%", height: "100%"}]} resizeMode='contain' />
          </View>
          <View style={{marginBottom: "1%"}}>
            <Button block iconLeft danger onPress={()=>this.props.navigate("Edit")}>
              <Icon name='ios-brush' />
              <Text>Edit Info</Text>
            </Button>
          </View>
          <View style={[{justifyContent: "flex-end"}]}>
            {authbtn}
          </View>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: 'yellow',
    },
    Icon: {
      color: "white",
      fontSize: 20,
    }
});
  