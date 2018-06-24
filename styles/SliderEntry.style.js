import { StyleSheet, Dimensions, Platform } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'rgb(232, 233, 237)', //rgb(232, 233, 237)
    background2: '#21D4FD'
};

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const slideHeight = viewportHeight * 0.36;
export const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        paddingTop: 8 - entryBorderRadius,
        paddingBottom: 5,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 8,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
});