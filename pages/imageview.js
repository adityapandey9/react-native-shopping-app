import React, { Component } from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
  
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageViewScreen extends Component {
    constructor(props) {
      super(props);
      this.items = this.props.navigation.state.params.item.imgs;
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
    
        return {
          title: params ? params.item.title : 'Details',
          tabBarVisible: false,
        };
      };
  
    render() {
      let images = [];
      for(let i=0;i<this.items.length;i++){
        images.push({url: this.items[i]})
      }
      return (
            <View style={[styles.container]}>
              <ImageViewer imageUrls={images}/>
            </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    }
});
  