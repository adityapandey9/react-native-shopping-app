import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform, ScrollView, FlatList
  } from 'react-native';
  
import Banner from '../Compoents/Banner';
import CardView from '../Compoents/CardView';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['title'];
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../Compoents/SliderEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1, ENTRIES2 } from './entries';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;


export default class TrendScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM
      }
     this.in = 0;
     this._renderItemWithParallax = this._renderItemWithParallax.bind(this);
     this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
    }

    static navigationOptions = {
      title: 'Trend and Discounts',
      headerLeft: null
    };
  
    _renderCardItem = (data) => (
      <CardView styles={[{width: (sliderWidth/2)-5}, styless.products]} funcs={this.props.navigation.navigate} data={data} id={this.in++} />
    );

    _keyExtractor = (item, index) => {
      item.id
    };
  
    searchUpdated(term) {
      this.setState({ searchTerm: term })
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
      return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            ist={true}
            isn={true}
            navi={this.props.navigation.navigate}
          />
      );
  }

    mainExample (number, title) {
      const { slider1ActiveSlide } = this.state;
      
      return (
          <View style={styles.exampleContainer}>
          <Text style={[styles.title, ]}>Best Of Our Products</Text>
              <Carousel
                ref={c => this._slider1Ref = c}
                data={ENTRIES2}
                renderItem={this._renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={2}
                // autoplay={true}
                // autoplayDelay={500}
                // autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
              />
          </View>
      );
  };

    render() {
      const filteredEmails = ENTRIES2.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      
      const banner = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
      let searchList = filteredEmails.map(email => {
        return email;
      });

      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            // scrollEventThrottle={200}
            directionalLockEnabled={true}>
              { banner }
              <Text style={[styles.title]}>Search Our Products</Text>
              <View style={[{elevation: 3}]} >
              <SearchInput 
              onChangeText={(term) => { this.searchUpdated(term) }} 
              style={[styless.searchInput, {backgroundColor: 'white', elevation: 3}]}
              placeholder="Search Our Products"
              />
              </View>
              <FlatList
                  data={searchList}
                  numColumns={2}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderCardItem}
                />
          </ScrollView>
        </View>
      );
    }
  }
  
const styless = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      flex: 1,
      height: 260,
      margin: 5
    },
    list: {
      flex: 1
    },
    products: {
      margin: 3,
    },
    searchInput: {
      paddingTop: 2,
      marginTop: 8,
      margin: 5,
      paddingBottom: 10,
      backgroundColor: "rgb(232, 237, 244)",
      color: "#212121",
      borderRadius: 3,
    }
});
  