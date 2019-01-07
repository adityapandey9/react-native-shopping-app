import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ToastAndroid,
    ActivityIndicator,
    Text,
    TouchableHighlight
  } from 'react-native';

import CardView from '../Compoents/CardView';
import firebase from 'react-native-firebase';
import { sliderWidth } from '../styles/SliderEntry.style';

export default class ListScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;
      this.items = this.props.navigation.state.params.title;
      this.state = {data: null, isRefreshing: false}
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
      if(!firebase.auth().currentUser && this.items <= 0 && global.config>1){
        this.props.navigation.replace("Login", "List");
      }
      this.getData = this.getData.bind(this);
      this.popElement = this.popElement.bind(this);
    }

    componentDidMount(){
      this.getData();
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      const title = params.title;
  
      return {
        title: (title>0) ? "My Wishlist" : 'My Orders',
        tabBarVisible: false,
      };
    };

    _renderCardItem = (data) => (
      <CardView styles={[{width: (sliderWidth)}]} pops={this.popElement} type={this.items+1} funcs={this.props.navigation.navigate} data={data} id={this.in++} />
    );
  
    _keyExtractor = (item, index) => {
      item.id 
    };

    popElement(val){
      this.state.data.splice(val, 1)
      ToastAndroid.show("Removed from wishlist", ToastAndroid.SHORT);
    }
  
    getData(){
      if(this.items>0){
        global.storage.getAllDataForKey('wishlist').then(data => {
          this.setState({data: data})
        });
        return;
      }
      if(!firebase.auth().currentUser && global.config>1)
        return;
      const uid =  (global.config<=1)? "s76aK38yMES6ATnXrFJiZnxhChs2" : firebase.auth().currentUser.uid;
      firebase.database().ref("/orders/"+uid).once("value", (res)=>{
        let list = res.val();
        let data = [];
        let prom = [];
        for(let keyi in list){
          const obj = list[keyi];
          obj["ordkey"] = keyi;
          let proms = firebase.database().ref("data/"+obj.id).once("value", (pro)=>{
            const val = pro.val();
            var robj = {key: obj.id, ordkey: obj.ordkey, status: obj.status, date: obj.date, val};
            data.push({data: robj});
          }, (err)=>{
            console.error("Er: ", err);
          });
          prom.push(proms);
        }
        Promise.all(prom).then((res)=>{
          this.setState({data})
          // console.error(this.state.data)
        })
      }, (err)=> {
        console.error(err)
      })
    }

    render() {
      if(this.state.data == null){
        return <ActivityIndicator style={{marginTop: "20%"}} />
      }
      if(this.state.data.length == 0){
        return (
          <View style={[styles.container, {flex: 1, alignItems: "center", marginTop: "15%"}]}>
            <Text style={[{fontSize: 20, fontWeight: 'bold',}]}>No, item is present here.</Text>
          </View>
        )
      } 
      // console.error(this.state.data)
      return (
        <View style={[styles.container, {flex: 1}]}>
          <FlatList
                    ItemSeparatorComponent={({highlighted}) => (
                      <View style={[highlighted && {marginLeft: 0}]} />
                    )}
                    data={this.state.data}
                    numColumns={1}
                    contentContainerStyle={{margin:0,padding:0}}
                    renderItem={({item, separators}) => (
                      <TouchableHighlight onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight} onPress={()=> this.props.navigation.navigate("Details", item.data)}>
                              <CardView styles={[{width: (sliderWidth)}]} pops={this.popElement}  funcs={this.props.navigation.navigate}  type={this.items+1} data={item} />
                      </TouchableHighlight>
                    )}
                  />
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'white',
      // maxHeight: "20%",
      // borderColor: 2,
      // borderColor: "black"
    },
});
  