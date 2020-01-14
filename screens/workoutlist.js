import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


const initialWorkouts = [
    { title: "Chest and Shoulders", data: [
        { type: 'resistance', key: 0, showing: true, complete: false, name: 'Bench Press', reps: 5, baseWeight: 155, sets: Array(5).fill(false), },
        { type: 'timer', key: 1, showing: false, complete: false, initial: 10, elapsed: 0, paused: true, },
        { type: 'resistance', key: 2, showing: false, complete: false, name: 'Overhead Press', reps: 8, baseWeight: 100, sets: Array(4).fill(false), },
    ]},
    { title: "Legs", data: [
        { type: 'resistance', key: 0, showing: true, complete: false, name: 'Squats', reps: 5, baseWeight: 175, sets: Array(5).fill(false), },
        { type: 'resistance', key: 1, showing: false, complete: false, name: 'Lunges', reps: 5, baseWeight: 80, sets: Array(5).fill(false), },
        { type: 'timer', key: 2, showing: false, complete: false, initial: 60, elapsed: 0, paused: true, },
        { type: 'resistance', key: 3, showing: false, complete: false, name: 'Hip Thrusts', reps: 8, baseWeight: 225, sets: Array(5).fill(false), },
    ]}
]


const WorkoutListScreen = ({ navigation }) => {

    const [workouts, setWorkouts] = useState(initialWorkouts)

    const onReturn = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <Text style={style.title}>Workouts</Text>
            <View style={style.controlContainer}>
            <Button title="Return" onPress={onReturn} />
            </View>
            <FlatList
                data={workouts}
                keyExtractor={data => data.key}
                renderItem={( data ) => (
                    <Button title={data.name} onPress={() => navigation.navigate('workout', data)} />
                    )} >
            </FlatList>
        </SafeAreaView>
    );
};

WorkoutListScreen.propTypes = {
    navigation: PropTypes.any,
};

const style = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    controlContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    }
});


export default WorkoutListScreen;
