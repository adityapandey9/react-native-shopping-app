import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ActivityIndicator, ToastAndroid, FlatList, TouchableHighlight
  } from 'react-native';

import { sliderWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../Compoents/SliderEntry';
import firebase from 'react-native-firebase';
import ListLayout from '../Compoents/ListLayout';
import CardView from '../Compoents/CardView';
import { ENTRIES1 } from './entries'

export default class TrendScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
      }
     this.in = 0;
     this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
     this.getData = this.getData.bind(this);
     this.getData();
    }

    static navigationOptions = {
      title: 'Trend',
      headerLeft: null
    };

  getData(){
    firebase.database().ref("/data").orderByKey().limitToFirst(5).once("value", (res)=>{
      let list = res.val();
      let data = {"electronics": [], "personal": [], "home": []};
      var i = 0;
      // console.error("L: ", list)
        for(let j=0;j<list.length;j++){
          switch(list[j].cate){
            case 1:
              data["electronics"].push({key: j, val:list[j]});
              break;
            case 2:
              data["personal"].push({key: j, val:list[j]});
              break;
            case 3:
              data["home"].push({key: j, val:list[j]});
          }
        }
      // ToastAndroid.show(`${data} Products`, ToastAndroid.SHORT);
      this.setState({data: data});
      // console.error(`${JSON.stringify(data)}`);
    }, (err)=> {
      console.error(err)
      ToastAndroid.show(err, ToastAndroid.SHORT);
    })
  }

  _renderCardItem = (data) => (
    <CardView styles={[{width: (sliderWidth/2)}]} style={styles.entry} funcs={this.props.navigation.navigate} data={data} key={this.in++} />
  );

  _keyExtractor = (item, index) => {
    item.id 
  };

    render() {
      if(this.state.data == null){
       return <ActivityIndicator style={{marginTop: "20%"}} />
      }
      let bigel = [];
      for(let key in this.state.data){
        let data = this.state.data[key];
        if(data.length <= 0)
          continue
        bigel.push(<View style={[{backgroundColor: "white", marginBottom: 10, flexDirection: "column"}]}>
          <Text style={[styles.head, {alignSelf: "center"}]}>{key}</Text>
          <FlatList
              ItemSeparatorComponent={({highlighted}) => (
                <View style={[highlighted && {marginLeft: 0}]} />
              )}
              data={data}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({item, separators}) => (
                <TouchableHighlight onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight} onPress={()=> this.props.navigation.navigate("Details", item)}>
                        <CardView styles={[{width: (sliderWidth/2)}]} focus={this.props.isFocused} data={item} />
                </TouchableHighlight>
              )}
            /></View>);
      }

      return (
        <ScrollView style={styles.container}>
            {bigel}
        </ScrollView>
      );
    }
  }
  
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    entry: {
      // width: 80, 
      // height: 280,
      margin: 5,
    },
    head: {
      backgroundColor: "white",
      fontSize: 17,
      fontWeight: 'bold',
    }
});
  