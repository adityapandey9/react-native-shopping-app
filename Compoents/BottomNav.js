import React, { Component } from 'react';
import { Icon, Text} from 'native-base';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types'

export default class BottomNav extends Component {

  static propTypes = {
    navigation: PropTypes.shape({}),
    getOnPress: PropTypes.func,
    getLabel: PropTypes.func,
    renderIcon: PropTypes.func,
    jumpToIndex: PropTypes.func,
  }

  static defaultProps = {
    navigation: {},
    getOnPress: () => {},
    getLabel: () => {},
    renderIcon: () => {},
    jumpToIndex: () => {},
  }

  constructor(props){
    super(props)
  }

    render(){
    const { navigation, getLabel, renderIcon, jumpToIndex } = this.props
    const { routes } = navigation.state
    const tabs = routes.map((route, index) => {
    const focused = index === navigation.state.index
    const scene = { route, index, focused } 
    const label = getLabel({ ...scene })
    const icon = renderIcon({ ...scene })

      return (
           <TouchableHighlight onPress={() => jumpToIndex(index)} underlayColor="white" key={`tab-${route.key}`}>
             <View style={styles.bottom}>
                 {icon}
                 <Text style={[{fontSize: 14}]}>{label}</Text>
             </View>
           </TouchableHighlight>
      )
    })
      return(
        <View style={[{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgb(239, 250, 249)'}, styles.bottomnav, {elevation: 2}]} >
          {tabs}    
        </View>
      );
    }
}

const styles = StyleSheet.create({
  bottom: {
    alignContent: 'center',
    paddingTop: 2,
  },
  bottomnav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderTopColor: 'rgb(232, 237, 244)',
    borderTopWidth: 1,
  }
});