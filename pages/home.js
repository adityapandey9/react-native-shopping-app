import React, { Component } from 'react';

import CardView from '../Compoents/CardView';
import { Button, Icon, Drawer } from 'native-base';
import firebase from 'react-native-firebase';

import { TextInput, View, ScrollView, Text, FlatList, StyleSheet, ActivityIndicator, ToastAndroid, TouchableHighlight } from 'react-native';
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
      this.limit = 4;
      this.end = 0;
      this.state = {data: [], isRefreshing: true, searchInput: '', curr: 1, lastkey: null}
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
      this.getData = this.getData.bind(this);
      this.toggleDrawer = this.toggleDrawer.bind(this);
      this.handleRefresh = this.handleRefresh.bind(this);
      this.handleMore = this.handleMore.bind(this);
      this._onPress = this._onPress.bind(this);
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
      <CardView styles={[{width: (sliderWidth/2)}]} focus={this.props.isFocused} funcs={this.props.navigation.navigate} data={data} key={parseInt(data.id)+(this.in++)+""} />
    );

    _keyExtractor = (item, index) => {
      item.key
    };

    handleMore(){
      if(this.end <= (parseInt(this.state.lastkey)+1)){
        ToastAndroid.show(`No More Products`, ToastAndroid.SHORT);
        return;
      }
      console.log("E: ", this.state.lastkey, this.end);
      // ToastAndroid.show("Start Loading", ToastAndroid.SHORT);
      let startkey = (parseInt(this.state.lastkey)+1)+"";
      let lastkey = (parseInt(this.state.lastkey)+this.limit)+"";
      console.log(startkey, lastkey);
      this.setState({isRefreshing: true}, ()=>{
        firebase.database().ref("/data").orderByKey().limitToFirst(this.limit).startAt(startkey).endAt(lastkey).once("value", (res)=>{
          let list = res.val();
          let data = this.state.data;
          let last = null;
          for(let key in list){
            let value = list[key];
            value =  {key: key, val: value};
            last = key;
            data = data.concat(value)
          }
          // ToastAndroid.show(`${data.length} More Products`, ToastAndroid.SHORT);
          
          this.setState({
            data: data, 
            lastkey: last,
            isRefreshing: false
          });
          // console.error(`${JSON.stringify(data)}`);
          console.log(this.state.data)
        }, (err)=> {
          console.error(err)
          ToastAndroid.show(err, ToastAndroid.SHORT);
        })
        firebase.database().ref("/posts").once("value", (res)=>{
          let num = res.val();
          this.end = num;
        }, (err)=>{
          console.error(err);
        })
      })
      
    }

    handleRefresh(){
      this.setState({isRefreshing: !this.state.isRefreshing}, ()=>{
        this.handleMore();
      });
    }


  getData(){
      firebase.database().ref("/data").orderByKey().limitToFirst(this.limit).once("value", (res)=>{
        let list = res.val();
        let data = [];
        let last = null;
        for(let key in list){
          let value = list[key];
          value =  {key: key, val: value};
          last = key;
          data = data.concat(value);
        }
        ToastAndroid.show(`${data.length} Products`, ToastAndroid.SHORT);
        this.setState({
          data: data, 
          lastkey: last,
          isRefreshing: false
        });
        // console.error(`${JSON.stringify(data)}`);
      }, (err)=> {
        console.error(err)
        ToastAndroid.show(err, ToastAndroid.SHORT);
      })
      firebase.database().ref("/posts").once("value", (res)=>{
        let num = res.val();
        this.end = num;
      }, (err)=>{
        console.error(err);
      });
  }

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 5,
        }}
      >
        {this.state.isRefreshing && <ActivityIndicator animating size="large" />} 
      </View>
    );
  };

  _onPress(item){
    this.props.navigation.navigate("Details", item);
  }

    render() {
      let slider = [];
      for(let j=0;j<ENTRIES1.length;j++){
        slider.push(<SliderEntry data={ENTRIES1[j]} style={styless.entry} key={j+"2"} ist={true} even={true} />)
      }

      let isloaded = null;
      if(this.state.data != null){
        isloaded = <FlatList
                    ItemSeparatorComponent={({highlighted}) => (
                      <View style={[highlighted && {marginLeft: 0}]} />
                    )}
                    numColumns={2}
                    style={[styless.newv]}
                    contentContainerStyle={{margin:0,padding:0}}
                    data={this.state.data}
                    renderItem={({item, separators}) => (
                      <TouchableHighlight onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight} onPress={()=> this._onPress(item)}>
                              <CardView styles={[{width: (sliderWidth/2)}]} focus={this.props.isFocused}  funcs={this.props.navigation.navigate}  data={item} />
                      </TouchableHighlight>
                    )}
                    ListFooterComponent={this.renderFooter}
                  />;
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
                  <Text style={[styles.title, {elevation: 3}]}>Our Products</Text>
                  {isloaded}
                  <Button warning block onPress={()=>this.handleMore()}><Text style={[{color: "white"}]}>Load More</Text></Button>
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
  