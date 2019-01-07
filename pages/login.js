import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Button
  } from 'react-native';
  
// import Layout from '../Compoents/Layout';
// import ConfigApp from '../config';
// import { auth } from '../firebase/firebase';
import firebase from 'react-native-firebase';
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Container, Header, Title, Content, Icon, Card, CardItem, Text, Body, Left, Right } from "native-base";

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      if(firebase.auth().currentUser){
        this.props.navigation.navigate("Menu");
      }
      this.state = {
        user: null,
        message: '',
        codeInput: '',
        phoneNumber: '+91',
        confirmResult: null,
      };
      
    }

    static navigationOptions = {
      title: 'Login',
      // headerLeft: null,
      tabBarVisible: false,
    };
    
    
  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          // this.setState({user})
          global.storage.save({
            key: "login",
            data: this.state.phoneNumber,
            expires: null,
          });
          this.navigation.navigate("Home");
        })
        .catch(error =>{ 
          if(firebase.auth().currentUser){
            global.storage.save({
              key: "login",
              data: this.state.phoneNumber,
              expires: null,
            });
            this.navigation.navigate("Home");
          }
          this.setState({ message: `Code Confirm Error: ${error.message}` })});
    }
  };

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

      </View>
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
  