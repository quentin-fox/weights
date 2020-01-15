import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Stepper = ({
    count = 0,
    min = null,
    max = null,
    onIncrement,
    onDecrement,
    label,
    countSuffix = '',
}) => {
    const handleIncrement = () => {
        if (max == null || count + 1 <= max) {
            onIncrement();
        }
    };

    const handleDecrement = () => {
        if (min == null || count - 1 >= min) {
            onDecrement();
        }
    };

    const incDisabled = count === max;
    const decDisabled = count === min;

    const style = StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
        rowContainer: {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        label: {
            fontSize: 18,
        },
        counter: {
            fontSize: 28,
            textAlign: 'left',
        },
        buttonContainer: {
            width: 84,
            height: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            height: 35,
            width: 40,
        },
        decrement: {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: decDisabled ? '#f4f4f4' : '#dddddd',
        },
        increment: {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: incDisabled ? '#f4f4f4' : '#dddddd',
        },
        symbol: {
            fontSize: 26,
            color: 'black',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
    });

    return (
        <View style={style.container}>
            {label != null && <Text style={style.label}>{label}</Text>}
            <View style={style.rowContainer}>
                <Text style={style.counter}>
                    {count}{countSuffix}
                </Text>
                <View style={style.buttonContainer}>
                    <TouchableHighlight
                        disabled={decDisabled}
                        onPress={handleDecrement}
                        style={style.decrement}>
                        <View style={{ ...style.button, ...style.decrement }}>
                            <Text style={style.symbol}>-</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        disabled={incDisabled}
                        onPress={handleIncrement}
                        style={style.increment}>
                        <View style={{ ...style.button, ...style.increment }}>
                            <Text style={style.symbol}>+</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

Stepper.propTypes = {
    count: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    label: PropTypes.string,
    countSuffix: PropTypes.string,
};

export default Stepper;
