import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import ResistanceExercise from '../src/components/resistance_exercise';
import Timer from '../src/components/timer';
import Control from '../src/components/titlecontrol';

const WorkoutScreen = ({ navigation }) => {
    const [data, setData] = useState([
        {
            type: 'resistance',
            key: 0,
            showing: true,
            complete: false,
            name: 'Bench Press',
            reps: 5,
            baseWeight: 155,
            sets: Array(5).fill(false),
        },
        {
            type: 'timer',
            key: 1,
            showing: false,
            complete: false,
            initial: 10,
            elapsed: 0,
            paused: true,
        },
        {
            type: 'resistance',
            key: 2,
            showing: false,
            complete: false,
            name: 'Overhead Press',
            reps: 8,
            baseWeight: 100,
            sets: Array(4).fill(false),
        },
    ]);

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

    }

    const handleNextShowing = key => {
        if (key < data.length - 1) {
            handleToggleShowing(key + 1);
        } else {
            handleToggleShowing(key);
        }
    };

    const baseAppStyle = { flex: 1, backgroundColor: '#f4f4f4' };

    return (
        <SafeAreaView style={baseAppStyle}>
            <Text style={style.title}>Workout</Text>
            <Control navigation={navigation} />
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
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
});

export default WorkoutScreen;
