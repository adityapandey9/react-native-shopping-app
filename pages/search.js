import React, { Component } from 'react';

import CardView from '../Compoents/CardView';
import firebase from 'react-native-firebase';

import { TextInput, ScrollView, Text, FlatList, StyleSheet, ActivityIndicator, ToastAndroid, View, TouchableHighlight } from 'react-native';
import { sliderWidth } from '../styles/SliderEntry.style';
import styles, { colors } from '../styles/index.style';

export default class SearchScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;
      this.params = this.props.navigation.state.params;
      this.state = {data: null, isRefreshing: false, searchInput: this.params.title}
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
      this.getData = this.getData.bind(this);
      this.getData();
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const params  = navigation.state.params || {};
      
      return {
        title:  params? params.title : "Search",
        tabBarVisible: false,
      };
    };

    _renderCardItem = (data) => (
      <CardView styles={[{width: (sliderWidth/2)}]} funcs={this.props.navigation.navigate} data={data} id={this.in++} />
    );

    _keyExtractor = (item, index) => {
      item.id 
    };

  getData(){
    firebase.database().ref("/data").orderByChild("name")
    .startAt(this.state.searchInput.toUpperCase())
    .endAt(this.state.searchInput+"\uf8ff")
            .once("value", (res)=>{
              let list = res.val();
              let data = [];
            
              for(let key in list){
                let value = list[key];
                if(value == null)
                  continue;
                value =  {key: key, val: value};
                data = data.concat(value);
              }
              ToastAndroid.show(`${data.length} Products`, ToastAndroid.SHORT);
              this.setState({data: data});
            }, (err)=>{
                console.error(err);
        })
  }


    render() {
        let isloaded = null;
        if(this.state.data != null){
        isloaded = <FlatList
                    data={this.state.data}
                    numColumns={2}
                    style={[styless.newv]}
                    contentContainerStyle={{margin:0,padding:0}}
                    ItemSeparatorComponent={({highlighted}) => (
                      <View style={[highlighted && {marginLeft: 0}]} />
                    )}
                    renderItem={({item, separators}) => (
                      <TouchableHighlight onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight} onPress={()=> this.props.navigation.navigate("Details", item)}>
                              <CardView styles={[{width: (sliderWidth/2)}]}  funcs={this.props.navigation.navigate}  data={item} />
                      </TouchableHighlight>
                    )}
                    />;
        } else {
          isloaded = <ActivityIndicator style={{marginTop: "10%"}} />
        }

        return (
        <View style={styles.container} >
            <ScrollView
                style={styles.scrollview}
                scrollEventThrottle={200}
                directionalLockEnabled={true}>
                    <TextInput placeholder={"Search for Products"}  onSubmitEditing={()=>this.getData()} value={this.state.searchInput} onChangeText={(txt)=>this.setState({searchInput: txt})} style={[styless.searchInput, {elevation: 3}]} underlineColorAndroid="transparent" />
                    {isloaded}
            </ScrollView>
        </View>
        );
    }
  }
  
const styless = StyleSheet.create({
    newv: {
      marginLeft: 7,
      marginTop: 10,
    },
    entry: {
      width: 100, 
      height: 90,
      margin: 5,
    },
    searchInput: {
      backgroundColor: "white",
      color: "#212121",
      borderRadius: 3,

    }
});
  