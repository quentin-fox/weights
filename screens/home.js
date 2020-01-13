import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button, View } from 'react-native';
import PropTypes from 'prop-types';

const HomeScreen = ({ navigation }) => {
    const handleBeginWorkout = () => {
        navigation.navigate('workout');
    };

    return (
        <SafeAreaView>
            <View style={style.titleContainer}>
                <Text style={style.titleText}>Workout App</Text>
            </View>
            <View>
                <Button title="Begin Workout" onPress={handleBeginWorkout} />
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    titleContainer: {
        marginTop: 50,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

HomeScreen.propTypes = {
    navigation: PropTypes.any,
}

export default HomeScreen;
