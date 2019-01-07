import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { img }, parallax, parallaxProps, even } = this.props;

        return (
            <Image
              source={{ uri: img }}
              style={[{flex: 1, resizeMode: "contain", }]}
            />
        );
    }  

    render () {
        const { data: { title }, even, isn, navi } = this.props;

        const uppercaseTitle = ((title || title != '') && this.props.ist == true) ? (
            <View style={[styles.textContainer, {marginTop: 1, flex: 0.1, alignItems: "center"} ,even ? styles.textContainerEven : {}]}>
                <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={1}>
                    { title.toUpperCase() }
                </Text>
            </View>
        ) : false; 

        let func = (isn) ? (()=>{navi("Details", {item: this.props.data})}): ()=>{};

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={[this.props.style, {flex: 1}]}
              onPress={func}
              >
                <View style={[{flex: 0.9}]} />
                <View style={[{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}, even ? {} : {}]}>
                    { this.image }
                </View>
                { uppercaseTitle }
            </TouchableOpacity>
        );
    }
}