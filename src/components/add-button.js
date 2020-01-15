import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const AddButton = ({ visible = true, onPress, radius = 40 }) => {
    const style = StyleSheet.create({
        circle: {
            height: radius,
            width: radius,
            borderRadius: radius / 2,
            backgroundColor: '#007ae1',
            flexDirection: 'column',
        },
        plus: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textAlign: 'center',
        },
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style.circle}>
                <Text style={style.plus}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

AddButton.propTypes = {
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    radius: PropTypes.number,

}

export default AddButton;
