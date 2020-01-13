import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Control = ({ navigation }) => {
    const handleEndWorkout = () => {
        navigation.navigate('home');
    };

    const handleTest = () => {
        navigation.navigate('list');
    }

    return (
        <View style={style.container}>
            <Button title="Exit" onPress={handleEndWorkout} />
            <Button title="Begin" onPress={handleTest}/>
        </View>
    );
};

Control.propTypes = {
    navigation: PropTypes.any,
}

const style = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Control;
