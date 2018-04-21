import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import { Icon } from 'native-base';

import { StyleSheet } from 'react-native';

import HomeScreen from './pages/home';
import DetailsScreen from './pages/details';
import LocationScreen from './pages/location';
import TrendScreen from './pages/trend';
import AboutScreen from './pages/about';
import ImageViewScreen from './pages/imageview';
import BottomNav from './Compoents/BottomNav';

import SplashScreen from 'react-native-smart-splash-screen'

const tabList = [
  {
    title: "Home",
    Icon: "ios-home",
  },
  {
    title: "Trending",
    Icon: "md-trending-up",
  },
  {
    title: "Location",
    Icon: "ios-compass",
  },
  {
    title: "About Us",
    Icon: "ios-information-circle",
  },
]

const tabBarConfiguration = {
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
  },
  tabBarPosition: 'bottom',
  tabBarComponent: BottomNav,
  swipeEnabled: false,
};

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  }, 
  Imageview: {
    screen: ImageViewScreen,
  }
});

const TrendStack = StackNavigator({
  Trend: {
    screen: TrendScreen,
  },
  Details: {
    screen: DetailsScreen,
  }, 
  Imageview: {
    screen: ImageViewScreen,
  }
});

const LocationStack = StackNavigator({
  Location: {
    screen: LocationScreen,
  }
});

const AboutStack = StackNavigator({
  About: {
    screen: AboutScreen,
  },
}); 

const RootStack = TabNavigator(
  {
    home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: tabList[0].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={tabList[0].Icon} style={[styles.centerit, focused ? {color: 'black'}: {color: 'gray'}]} />
        )
      }
    },
    trend: {
      screen: TrendStack,
      navigationOptions: {
        tabBarLabel: tabList[1].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={tabList[1].Icon} style={[styles.centerit, focused ? {color: 'black'}: {color: 'gray'}]} />
        )
      }
    },
    location: {
      screen: LocationStack,
      navigationOptions: {
        tabBarLabel: tabList[2].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={tabList[2].Icon} style={[styles.centerit, focused ? {color: 'black'}: {color: 'gray'}]} />
        )
      }
    },
    about: {
      screen: AboutStack,
      navigationOptions: {
        tabBarLabel: tabList[3].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={tabList[3].Icon} style={[styles.centerit, focused ? {color: 'black'}: {color: 'gray'}]} />
        )
      }
    }
  }, tabBarConfiguration);


export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount () {
    SplashScreen.close({
       animationType: SplashScreen.animationType.scale,
       duration: 550,
       delay: 0,
    })
 }

  render() {
    return (
    <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerit: {
    color: "#443f3f",
    alignSelf: 'center',
    fontSize: 20,
  },
  loadingBackgroundStyle: {
    backgroundColor: 'rgba(125, 125, 255, 1)',
  },
});
