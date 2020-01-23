import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ResistanceExercise from '../src/components/resistance-exercise';
import Timer from '../src/components/timer';
import Control from '../src/components/titlecontrol';
import AddButton from '../src/components/add-button';
import NewExerciseModal from '../src/components/new-exercise-modal';
import { connect } from 'react-redux';
import {
    addExercise,
    cyclePause,
    countDown,
    resetTimer,
    toggleShowing,
    toggleSet,
} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const workoutID = ownProps.navigation.state.params.id;
    return {
        workout: state[workoutID],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddExercise: (workoutKey, type, data) => dispatch(addExercise(workoutKey, type, data)),
        onCyclePause: (workoutKey, exKey) => dispatch(cyclePause(workoutKey, exKey)),
        onCountDown: (workoutKey, exKey, by) => dispatch(countDown(workoutKey, exKey, by)),
        onResetTimer: (workoutKey, exKey) => dispatch(resetTimer(workoutKey, exKey)),
        onToggleShowing: (workoutKey, exKey) => dispatch(toggleShowing(workoutKey, exKey)),
        onToggleSet: (workoutKey, exKey, setKey) => dispatch(toggleSet(workoutKey, exKey, setKey)),
    };
};

const WorkoutScreen = ({
    navigation,
    workout,
    onAddExercise,
    onCyclePause,
    onCountDown,
    onResetTimer,
    onToggleShowing,
    onToggleSet,
}) => {
    const data = workout.data;
    const canBeginWorkout = workout.data.length > 0;
    const title = workout.title;
    const workoutKey = navigation.state.params.id;

    const handleAddExercise = (type, data) => {
        onAddExercise(workoutKey, type, data);
    };

    const handleCyclePause = exKey => {
        onCyclePause(workoutKey, exKey);
    };

    const handleCountDown = exKey => {
        const by = 1;
        onCountDown(workoutKey, exKey, by);
    };

    const handleResetTimer = exKey => {
        onResetTimer(workoutKey, exKey);
    };

    const handleToggleShowing = exKey => {
        onToggleShowing(workoutKey, exKey);
    };

    const handleToggleSet = (exKey, setKey) => {
        onToggleSet(workoutKey, exKey, setKey);
    };

    const baseAppStyle = { flex: 1, backgroundColor: '#f4f4f4' };

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={baseAppStyle}>
            <Text style={style.title}>{title}</Text>
            <Control
                titleLeft="Back"
                onLeft={() => navigation.goBack()}
                titleRight="Begin"
                rightDisabled={!canBeginWorkout}
                onRight={() => {}}
            />
            <ScrollView>
                {data.map((exData, index) => {
                    switch (exData.type) {
                        case 'resistance':
                            return (
                                <ResistanceExercise
                                    onToggleSet={handleToggleSet}
                                    onToggleShowing={handleToggleShowing}
                                    data={{ ...exData, key: index }}
                                    key={index}
                                />
                            );
                        case 'timer': {
                            return (
                                <Timer
                                    onCyclePause={handleCyclePause}
                                    onResetTimer={handleResetTimer}
                                    onCountDown={handleCountDown}
                                    onToggleShowing={handleToggleShowing}
                                    data={{ ...exData, key: index }}
                                    key={index}
                                />
                            );
                        }
                    }
                })}
                {!modalVisible && (
                    <View style={style.addButtonContainer}>
                        <AddButton onPress={() => setModalVisible(true)} />
                    </View>
                )}
            </ScrollView>
            <NewExerciseModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddExercise={handleAddExercise}
            />
        </SafeAreaView>
    );
};

WorkoutScreen.propTypes = {
    navigation: PropTypes.any,
    workout: PropTypes.shape({
        title: PropTypes.string,
        data: PropTypes.array,
    }),
    onAddExercise: PropTypes.func,
    onCyclePause: PropTypes.func,
    onCountDown: PropTypes.func,
    onResetTimer: PropTypes.func,
    onToggleShowing: PropTypes.func,
    onToggleSet: PropTypes.func,
};

const style = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    addButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutScreen);
