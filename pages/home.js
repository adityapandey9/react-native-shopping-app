import React, { Component } from 'react';

import CardView from '../Compoents/CardView';
import { Button, Icon, Drawer } from 'native-base';
import firebase from 'react-native-firebase';

import { TextInput, View, ScrollView, Text, FlatList, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { sliderWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../Compoents/SliderEntry';
import ListLayout from '../Compoents/ListLayout';
import styles, { colors } from '../styles/index.style';
import ConfigApp from '../config';
import MenuScreen from './menu';
import { withNavigationFocus } from 'react-navigation';
import { ENTRIES1 } from './entries'


class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;
      this.open = 0;
      this.state = {data: null, isRefreshing: false, searchInput: ''}
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
      this.getData = this.getData.bind(this);
      this.toggleDrawer = this.toggleDrawer.bind(this);
      this.handleRefresh = this.handleRefresh.bind(this);
      this.getData();
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const params  = navigation.state.params || {};
      
      return {
        title: ConfigApp.name,
        headerLeft: (
          params.headerRight
        ),
        // header: null,
      };
    };

    _setNavigationParams() {
      let headerRight = <Button transparent
      style={[{alignItems: "center", marginTop: "10%"}]}
      onPress={() => this.toggleDrawer()}>
      <Icon active name="ios-more" />
    </Button>;
    
      this.props.navigation.setParams({ 
        headerRight, 
      });
    }

    toggleDrawer(){
      if(this.open > 0){
        this.drawer._root.close();
        --this.open;
      } else{
        this.drawer._root.open();
        ++this.open;
      }
    }
    
    componentWillMount() {
      this._setNavigationParams();      
    }
  
    _renderCardItem = (data) => (
      <CardView styles={[{width: (sliderWidth/2)}]} focus={this.props.isFocused} funcs={this.props.navigation.navigate} data={data} id={this.in++} />
    );

    _keyExtractor = (item, index) => {
      item.id 
    };

    handleRefresh(){
      ToastAndroid.show("Start Loading", ToastAndroid.SHORT);
      this.setState({
        isRefreshing: false
      });
    }


  getData(){
    firebase.database().ref("/data").orderByKey().limitToFirst(4).once("value", (res)=>{
      let list = res.val();
      let data = [];
    
      for(let key in list){
        let value = list[key];
        value =  {id: key, val: value};
        data = data.concat(value);
      }
      ToastAndroid.show(`${data.length} Products`, ToastAndroid.SHORT);
      this.setState({data: data});
      // console.error(`${JSON.stringify(data)}`);
    }, (err)=> {
      console.error(err)
      ToastAndroid.show(err, ToastAndroid.SHORT);
    })
  }


    render() {
      let slider = [];
      for(let j=0;j<ENTRIES1.length;j++){
        slider.push(<SliderEntry data={ENTRIES1[j]} style={styless.entry} ist={true} even={true} />)
      }

      let isloaded = null;
      if(this.state.data != null){
        isloaded = <View><Text style={[styles.title, {elevation: 3}]}>Our Products</Text>
                  <FlatList
                    data={this.state.data}
                    numColumns={2}
                    style={[styless.newv]}
                    contentContainerStyle={{margin:0,padding:0}}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCardItem}
                    onEndReached={this.handleRefresh}
                    onEndThreshold={0}
                  /></View>;
      } else {
        isloaded = <ActivityIndicator style={{marginTop: "40%"}} />
      }

      return (
        <Drawer style={styles.container} content={<MenuScreen navigate={this.props.navigation.navigate} />}  ref={(ref) => { this.drawer = ref; }} tapToClose={true} onClose={()=>this.drawer._root.close()} >
          <ScrollView
              style={styles.scrollview}
              scrollEventThrottle={200}
              directionalLockEnabled={true}>
                  <TextInput placeholder={"Search for Products"}  onSubmitEditing={()=>this.props.navigation.navigate("Search", {title: this.state.searchInput})} onChangeText={(txt)=>this.setState({searchInput: txt})} style={[styless.searchInput, {elevation: 3}]} underlineColorAndroid="transparent" />
                  <ListLayout title={""} width={200}>
                    {slider}
                  </ListLayout>
                  {isloaded}
                  { this.state.isRefreshing?  <ActivityIndicator />: false }
            </ScrollView>
        </Drawer>
      );
    }
  }
  
const styless = StyleSheet.create({
    newv: {
      marginLeft: 7,
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

export default withNavigationFocus(HomeScreen);
  