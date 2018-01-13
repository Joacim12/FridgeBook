import React, {Component} from 'react'
import {Animated, View, StyleSheet, Image, Dimensions, ScrollView, TouchableHighlight} from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const FIXED_BAR_WIDTH = 140
const BAR_SPACE = 20


class ImageSlider extends Component {

    state = {
        images: this.props.images
    }

    numItems = this.state.images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    handleImagePress = (e) => {
        const now = new Date().getTime();
        if (this.lastImagePress && (now - this.lastImagePress) < 300) {
            delete this.lastImagePress;
            this.props.handleImagePress();
        }
        else {
            this.lastImagePress = now;
        }
    }


    render() {
        let imageArray = []
        let barArray = []
        this.state.images.forEach((image, i) => {
            const thisImage = (
                <TouchableHighlight activeOpacity={1} key={`image${i}`} onPress={() => this.handleImagePress()}>
                    <Image
                        source={{uri: image}}
                        style={{width: deviceWidth, height: deviceHeight / 3}}
                    />
                </TouchableHighlight>
            )
            imageArray.push(thisImage)

            const scrollBarVal = this.animVal.interpolate({
                inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
                outputRange: [-this.itemWidth, this.itemWidth],
                extrapolate: 'clamp',
            })

            const thisBar = (
                <View
                    key={`bar${i}`}
                    style={[
                        styles.track,
                        {
                            width: this.itemWidth,
                            marginLeft: i === 0 ? 0 : BAR_SPACE,
                        },
                    ]}
                >
                    <Animated.View

                        style={[
                            styles.bar,
                            {
                                width: this.itemWidth,
                                transform: [
                                    {translateX: scrollBarVal},
                                ],
                            },
                        ]}
                    />
                </View>
            )
            barArray.push(thisBar)
        })

        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onScroll={
                        Animated.event(
                            [{nativeEvent: {contentOffset: {x: this.animVal}}}]
                        )
                    }
                >

                    {imageArray}

                </ScrollView>
                <View
                    style={styles.barContainer}
                >
                    {this.state.images.length > 1 ? barArray : null}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 40,
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: '#5294d6',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
})

export default ImageSlider;