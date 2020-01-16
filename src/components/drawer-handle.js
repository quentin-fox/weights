import React from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const Handle = ({ setPos, closeDrawer, minTopPadding = 70, bottomCloseThreshold = 40 }) => {

    const panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderMove: (evt, gestureState) => {

            if (gestureState.moveY > minTopPadding) {
                setPos(gestureState.moveY - 40)
            }

            const bottomHeight = Dimensions.get('screen').height - bottomCloseThreshold

            if (gestureState.moveY > bottomHeight) {
                closeDrawer()
            }
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        },
    });


    return (
        <View style={style.clickable} {...panResponder.panHandlers}>
            <View style={style.handle} />
        </View>

    )

};

Handle.propTypes = {
    setPos: PropTypes.func,
    closeDrawer: PropTypes.func,
    minTopPadding: PropTypes.number,
    bottomCloseThreshold: PropTypes.number,
}

const style = StyleSheet.create({
    clickable: {
        height: 30,
        flexDirection: 'column',
    },
    handle: {
        height: 8,
        width: 70,
        marginTop: 5,
        borderRadius: 4,
        backgroundColor: '#dddddd',
        alignSelf: 'center',
        marginBottom: -10,
    },
});

export default Handle;
