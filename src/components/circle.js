import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Circle = ({
    exKey,
    setKey,
    completed,
    radius = 20,
    colors = ['black', 'white'],
    onToggleSet,
}) => {
    const circleStyle = () => {
        const bgColors = completed ? colors[0] : colors[1];
        const style = StyleSheet.create({
            circle: {
                height: radius,
                backgroundColor: bgColors,
                width: radius,
                borderRadius: radius / 2,
                borderColor: colors[0],
                borderWidth: 2,
            },
        });
        return style.circle;
    };
    return (
        <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={() => onToggleSet(exKey, setKey)}>
            <View style={circleStyle()} />
        </TouchableWithoutFeedback>
    );
};

Circle.propTypes = {
    radius: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
};

export default Circle;
