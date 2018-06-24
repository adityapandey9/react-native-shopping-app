import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { Icon } from 'native-base';

import { StyleSheet } from 'react-native';

//Importing the pages for navigation
import HomeScreen from './pages/home';
import DetailsScreen from './pages/details';
import LocationScreen from './pages/location';
import TrendScreen from './pages/trend';
import AboutScreen from './pages/about';
import ImageViewScreen from './pages/imageview';
import LoginScreen from './pages/login';
import MenuScreen from './pages/menu';
import ListScreen from './pages/list';
import OrderScreen from './pages/order';
import EditScreen from './pages/edit';
import SearchScreen from './pages/search';

//Custom Bottom Navigation Bar
import BottomNav from './Compoents/BottomNav';

//Database initialization
import './database/database';

import SplashScreen from 'react-native-smart-splash-screen'


//Initialize the Config
global.config = 2;

//List of Tabs in Bottom navigation bar
const tabList = [
  {
    title: "Home",
    Icon: "ios-home-outline",
    Select: "ios-home",
  },
  {
    title: "Trend",
    Icon: "ios-trending-up-outline",
    Select: "md-trending-up",
  },
  {
    title: "Location",
    Icon: "ios-compass-outline",
    Select: "ios-compass",
  },
  {
    title: "About Us",
    Icon: "ios-information-circle-outline",
    Select: "ios-information-circle",
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
  },
  Login: {
    screen: LoginScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
  List: {
    screen: ListScreen,
  },
  Order: {
    screen: OrderScreen,
  },
  Edit: {
    screen: EditScreen,
  },
  Search: {
    screen: SearchScreen,
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
  },
  Login: {
    screen: LoginScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
  List: {
    screen: ListScreen,
  },
  Order: {
    screen: OrderScreen,
  },
  Edit: {
    screen: EditScreen,
  }
});

const LocationStack = StackNavigator({
  Location: {
    screen: LocationScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
  List: {
    screen: ListScreen,
  },
  Edit: {
    screen: EditScreen,
  }
});

const AboutStack = StackNavigator({
  About: {
    screen: AboutScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
  List: {
    screen: ListScreen,
  },
  Edit: {
    screen: EditScreen,
  }
}); 

const RootStack = TabNavigator(
  {
    home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: tabList[0].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={focused? tabList[0].Select: tabList[0].Icon} style={[styles.centerit, focused ? {color: 'blue'}: {color: 'gray'}]} />
        )
      }
    },
    trend: {
      screen: TrendStack,
      navigationOptions: {
        tabBarLabel: tabList[1].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={focused? tabList[1].Select: tabList[1].Icon} style={[styles.centerit, focused ? {color: 'blue'}: {color: 'gray'}]} />
        )
      }
    },
    location: {
      screen: LocationStack,
      navigationOptions: {
        tabBarLabel: tabList[2].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={focused? tabList[2].Select: tabList[2].Icon} style={[styles.centerit, focused ? {color: 'blue'}: {color: 'gray'}]} />
        )
      }
    },
    about: {
      screen: AboutStack,
      navigationOptions: {
        tabBarLabel: tabList[3].title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={focused? tabList[3].Select: tabList[3].Icon} style={[styles.centerit, focused ? {color: 'blue'}: {color: 'gray'}]} />
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
       duration: 350,
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
  centerit: {
    color: "#443f3f",
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});
