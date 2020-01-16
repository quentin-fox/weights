import React, { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Control from '../src/components/titlecontrol';
import NewWorkoutModal from '../src/components/new-workout-modal';

const initialWorkouts = [
    {
        title: 'Chest and Shoulders',
        data: [
            {
                type: 'resistance',
                showing: true,
                complete: false,
                name: 'Bench Press',
                reps: 5,
                baseWeight: 155,
                sets: Array(5).fill(false),
            },
            {
                type: 'timer',
                showing: false,
                complete: false,
                initial: 10,
                elapsed: 0,
                paused: true,
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Overhead Press',
                reps: 8,
                baseWeight: 100,
                sets: Array(4).fill(false),
            },
        ],
    },
    {
        title: 'Legs',
        data: [
            {
                type: 'resistance',
                showing: true,
                complete: false,
                name: 'Squats',
                reps: 5,
                baseWeight: 175,
                sets: Array(5).fill(false),
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Lunges',
                reps: 5,
                baseWeight: 80,
                sets: Array(5).fill(false),
            },
            {
                type: 'timer',
                showing: false,
                complete: false,
                initial: 60,
                elapsed: 0,
                paused: true,
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Hip Thrusts',
                reps: 8,
                baseWeight: 225,
                sets: Array(5).fill(false),
            },
        ],
    },
];

const WorkoutListScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState(initialWorkouts);

    const [modalVisible, setModalVisible] = useState(false);

    const onReturn = () => {
        navigation.goBack();
    };

    const startAddNew = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleAddWorkout = title => {
        const nextKey = workouts.length;
        const newWorkout = { title: title, key: nextKey, data: [] };
        setWorkouts([...workouts, newWorkout]);
        setModalVisible(false);
    };

    const handleAddExercise = (key, data, type) => {
        const transformData = (data, type) => {
            switch (type) {
                case 'timer':
                    return {
                        initial: data.duration,
                        elapsed: 0,
                        paused: true,
                    };
                case 'resistance':
                    return {
                        name: 'Test',
                        reps: data.reps,
                        baseWeight: data.reps,
                        sets: Array(data.sets).fill(false),
                    };
            }
        };

        let newWorkouts = [...workouts];
        let newEx = transformData(data, type);

        newEx = { ...newEx, showing: false, complete: false };

        newWorkouts[key].data.push(newEx);
        setWorkouts(newWorkouts);
    };

    return (
        <React.Fragment>
            <SafeAreaView>
                <Text style={style.title}>Workouts</Text>
                <Control
                    titleLeft="Back"
                    onLeft={onReturn}
                    titleRight="New"
                    onRight={startAddNew}
                />
                <FlatList
                    style={{ height: '100%' }}
                    data={workouts}
                    keyExtractor={data => data.title}
                    renderItem={({ item, index }) => (
                        <WorkoutCard
                            navigation={navigation}
                            id={index}
                            item={{...item, onAddExercise: handleAddExercise}}
                        />
                    )}
                />
                <NewWorkoutModal
                    visible={modalVisible}
                    onClose={handleModalClose}
                    onAddWorkout={handleAddWorkout}
                />
            </SafeAreaView>
        </React.Fragment>
    );
};

WorkoutListScreen.propTypes = {
    navigation: PropTypes.any,
};

const WorkoutCard = ({ item, navigation }) => {
    const onDoWorkout = () => {
        navigation.navigate('workout', item);
    };

    return (
        <TouchableWithoutFeedback onPress={onDoWorkout}>
            <View style={style.workoutContainer}>
                <Text style={style.workoutTitle}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

WorkoutCard.propTypes = {
    item: PropTypes.object,
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
    },
    workoutTitle: {
        flex: 1,
        marginLeft: 10,
        minHeight: 15,
        fontSize: 20,
    },
    workoutContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default WorkoutListScreen;
