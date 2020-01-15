import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ResistanceExercise from '../src/components/resistance-exercise';
import Timer from '../src/components/timer';
import Control from '../src/components/titlecontrol';
import AddButton from '../src/components/add-button';
import NewExerciseModal from '../src/components/new-exercise-modal';

const WorkoutScreen = ({ navigation }) => {
    const [data, setData] = useState(navigation.getParam('data'));

    const canBegin = data.length > 0;

    const [modalVisible, setModalVisible] = useState(false);

    const title = navigation.getParam('title');

    const handleCyclePause = key => {
        const newData = [...data];
        newData[key].paused = !newData[key].paused;
        setData(newData);
    };

    const handleCountDown = key => {
        const newData = [...data];
        newData[key].elapsed += 1;
        setData(newData);
    };

    const handleResetTimer = key => {
        const newData = [...data];
        newData[key].elapsed = 0;
        newData[key].complete = false;
        newData[key].paused = true;
        setData(newData);
    };

    const handleToggleShowing = key => {
        let newData = [...data];
        const oldState = newData[key].showing;
        newData[key].showing = !newData[key].showing;
        if (oldState === false) {
            newData = newData.map(d => {
                if (d.key !== key) {
                    d.showing = false;
                }
                return d;
            });
        }
        setData(newData);
    };

    const handleToggleSet = (exKey, setKey) => {
        const newData = [...data];
        newData[exKey].sets[setKey] = !newData[exKey].sets[setKey];
        setData(newData);
    };

    const handleComplete = key => {
        let newData = [...data];
        // not the last exercise
        if (key < data.length - 1) {
            newData[key + 1].showing = true;
        }

        newData[key].showing = false;
        newData[key].complete = true;
        setData(newData);
    };

    const baseAppStyle = { flex: 1, backgroundColor: '#f4f4f4' };

    return (
        <SafeAreaView style={baseAppStyle}>
            <Text style={style.title}>{title}</Text>
            <Control
                titleLeft="Back"
                onLeft={() => navigation.goBack()}
                titleRight="Begin"
                rightDisabled={!canBegin}
                onRight={() => {}}
            />
            <ScrollView>
                {data.map(exData => {
                    switch (exData.type) {
                        case 'resistance':
                            return (
                                <ResistanceExercise
                                    onToggleSet={handleToggleSet}
                                    onToggleShowing={handleToggleShowing}
                                    onComplete={handleComplete}
                                    data={exData}
                                    key={exData.key}
                                />
                            );
                        case 'timer': {
                            return (
                                <Timer
                                    onCyclePause={handleCyclePause}
                                    onResetTimer={handleResetTimer}
                                    onCountDown={handleCountDown}
                                    onToggleShowing={handleToggleShowing}
                                    onComplete={handleComplete}
                                    data={exData}
                                    key={exData.key}
                                />
            );
            }
                    }
                })}
        {!modalVisible &&
            <View style={style.addButtonContainer}>
            <AddButton onPress={() => setModalVisible(true)} />
            </View> }
            </ScrollView>
                <NewExerciseModal
        visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAddExercise={() => {}}
                />
                    </SafeAreaView>
    );
};

WorkoutScreen.propTypes = {
    navigation: PropTypes.any,
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

export default WorkoutScreen;
