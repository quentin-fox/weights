import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const handleBeginWorkout = () => {
        navigation.navigate('workout');
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Workout App</Text>
            </View>
            <View>
                <Button title="Being Workout" onPress={handleBeginWorkout} />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
