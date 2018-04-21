import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles , { sliderWidth, itemWidth, slideHeight } from '../styles/SliderEntry.style';

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
              style={[{width: itemWidth, height: slideHeight-10, flex: 1, backgroundColor: 'white', padding: 5}]}
              resizeMode='contain'
            />
        );
    }

    render () {
        const { data: { title }, even, isn, navi } = this.props;

        const uppercaseTitle = ((title || title != '') && this.props.ist == true) ? (
            <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}>
                    { title.toUpperCase() }
                </Text>
            </View>
        ) : false; 

        let func = (isn) ? (()=>{navi("Details", {item: this.props.data})}): ()=>{};

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={func}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                { uppercaseTitle }
            </TouchableOpacity>
        );
    }
}