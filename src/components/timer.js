import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback } from 'react-native';

const Timer = ({
    onCyclePause,
    onResetTimer,
    onCountDown,
    onToggleShowing,
    onComplete,
    data: { key, showing, complete, initial, elapsed, paused },
}) => {
    const buttonName = paused ? 'Start' : 'Stop';

    const shouldDecrement = !paused && elapsed < initial;

    const currentTime = new Date(1000 * (initial - elapsed)).toISOString().substr(14, 5);

    const nextExercise = () => {
        if (!complete && elapsed === initial) {
            onComplete(key);
        }
    };

    useEffect(nextExercise, [elapsed]);

    usePreciseTimer(() => onCountDown(key), 1000, shouldDecrement);

    return (
        <TouchableWithoutFeedback onPress={() => onToggleShowing(key)}>
            <View style={style.container}>
                <Text style={style.timerTitle}>Rest Timer</Text>
                {showing && (
                    <View style={style.detailContainer}>
                        <View style={style.buttonContainer}>
                            <Button title={buttonName} onPress={() => onCyclePause(key)} />
                        </View>
                        <View style={style.timerContainer}>
                            <Text style={style.timerText}>{currentTime}</Text>
                        </View>
                        <View style={style.buttonContainer}>
                            <Button title="Reset" onPress={() => onResetTimer(key)} />
                        </View>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const style = StyleSheet.create({
    container: {
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
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    timerTitle: {
        flex: 1,
        marginLeft: 10,
        minHeight: 15,
        marginBottom: 5,
        fontSize: 20,
    },
    timerContainer: {
        flex: 3,
    },
    buttonContainer: {
        flex: 1,
        paddingTop: 5,
    },
    timerText: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
    const [timeDelay, setTimeDelay] = useState(1);
    const savedCallback = useRef();
    const initialTime = useRef();

    useEffect(() => {
        savedCallback.current = handler;
    }, [handler]);

    useEffect(() => {
        if (activityFlag) {
            initialTime.current = new Date().getTime();
            const id = setInterval(() => {
                const currentTime = new Date().getTime();
                const delay = currentTime - initialTime.current;
                initialTime.current = currentTime;
                setTimeDelay(delay / 1000);
                savedCallback.current(timeDelay);
            }, periodInMilliseconds);

            return () => {
                clearInterval(id);
            };
        }
    }, [periodInMilliseconds, activityFlag, timeDelay]);
};

export default Timer;
