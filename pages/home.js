import React, { Component } from 'react';
  
import CardView from '../Compoents/CardView';
import Banner from '../Compoents/Banner';

import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../Compoents/SliderEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1, ENTRIES2 } from './entries';
import ConfigApp from '../config';

const SLIDER_1_FIRST_ITEM = 1;

export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.in = 0;
      this.state = {isRefreshing: false, slider1ActiveSlide: SLIDER_1_FIRST_ITEM}
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
    }
    static navigationOptions = {
        title: ConfigApp.name,
        headerLeft: null
    };
  
    _renderCardItem = (data) => (
      <CardView styles={[{width: (sliderWidth/2)-5}, styless.products]} funcs={this.props.navigation.navigate} data={data} id={this.in++} />
    );

    _renderBannerItem = (data) => {
      <Banner styles={[{width: 200}, styless.products]} data={data} id={this.in++} />
    };

  
    _keyExtractor = (item, index) => {
      item.id 
    };

    onRefresh = async () => {
     
      this.setState({
        isRefreshing: false
      });
    };

    _renderItemWithParallax ({item, index}, parallaxProps) {
      return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            ist = {true}
            isn={false}
            parallaxProps={parallaxProps}
          />
      );
  }

    mainExample (number, title) {
      const { slider1ActiveSlide } = this.state;

      return (
          <View style={styles.exampleContainer}>
          <Text style={[styles.title, ]}>Deal Of the Day</Text>
              <Carousel
                ref={c => this._slider1Ref = c}
                data={ENTRIES1}
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
              <Pagination
                dotsLength={ENTRIES1.length}
                activeDotIndex={slider1ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={colors.black}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
          </View>
      );
  };

  _renderItem = (data, i) => (
    <CardView styles={[{width: 200}, styless.products]} funcs={this.props.navigation.navigate} data={{item: data}} key={i} />
  );

  _renderPlaceholder = i => <View style={styles.item} key={i} />;

    render() {

      const banner = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');

      return (
        <View style={styles.container}>
            <ScrollView
              style={styles.scrollview}
              // scrollEventThrottle={200}
              directionalLockEnabled={true}>
                { banner }
                <Text style={[styles.title, {elevation: 3}]}>Our Products</Text>
                <FlatList
                  onRefresh={this.onRefresh}
                  data={ENTRIES2}
                  numColumns={2}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderCardItem}
                  refreshing={this.state.isRefreshing}
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
      margin: 5,
    },
    list: {
      flex: 1
    },
    products: {
      margin: 3,
      // borderColor: 'red',
      // borderWidth: 2,
      // height: 160
    }
});
  