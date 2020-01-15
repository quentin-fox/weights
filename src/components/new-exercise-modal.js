import React, { useState, useReducer } from 'react';
import { View, Text, Picker, StyleSheet, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Control from './titlecontrol';
import Stepper from './stepper';

const NewExerciseModal = ({ visible, onClose, onAddExercise }) => {
    const [exerciseType, setExerciseType] = useState('resistance');

    const initialExerciseData = {
        timer: { duration: 0 },
        resistance: { sets: 0, weight: 0, reps: 0 },
    };

    const [exerciseData, dispatch] = useReducer(reducer, initialExerciseData);

    const types = [
        { label: 'Resistance Exercise', value: 'resistance' },
        { label: 'Timer', value: 'timer' },
    ];

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            avoidKeyboard={true}
            backdropOpacity={0.3}>
            <View style={style.container}>
                <Control titleLeft="Close" onLeft={onClose} titleRight="Add" onRight={() => {}} />
                <View style={style.form}>
                    <Picker
                        selectedValue={exerciseType}
                        style={style.picker}
                        itemStyle={{ height: 90 }}
                        onValueChange={itemValue => setExerciseType(itemValue)}>
                        {types.map((tp, index) => (
                            <Picker.Item key={index} label={tp.label} value={tp.value} />
                        ))}
                    </Picker>
                    {/* {formType(exerciseType)} */}
                    <Stepper
                        count={exerciseData.resistance.reps}
                        min={0}
                        max={25}
                        label="Reps"
                        onIncrement={() => dispatch({ type: 'increment', field: 'reps' })}
                        onDecrement={() => dispatch({ type: 'decrement', field: 'reps' })}
                    />
                    <Stepper
                        count={exerciseData.resistance.sets}
                        min={0}
                        max={25}
                        label="Sets"
                        onIncrement={() => dispatch({ type: 'increment', field: 'sets' })}
                        onDecrement={() => dispatch({ type: 'decrement', field: 'sets' })}
                    />
                    <Stepper
                        count={exerciseData.resistance.weight}
                        countSuffix=" lbs"
                        min={0}
                        label="Weight"
                        onIncrement={() => dispatch({ type: 'increment', field: 'weight', by: 5 })}
                        onDecrement={() => dispatch({ type: 'decrement', field: 'weight', by: 5 })}
                    />
                </View>
            </View>
        </Modal>
    );
};

const reducer = (state, { type, field, by = 1}) => {
    switch (type) {
        case 'increment':
            return {
                ...state.timer,
                resistance: {
                    ...state.resistance,
                    [field]: state.resistance[field] + by,
                },
            };
        case 'decrement':
            return {
                ...state.timer,
                resistance: {
                    ...state.resistance,
                    [field]: state.resistance[field] - by,
                },
            };
    }
};

NewExerciseModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onAddExercise: PropTypes.func,
};

const style = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 350,
        marginBottom: -30,
        marginLeft: -10,
        marginRight: -10,
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    form: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    picker: {},
});

export default NewExerciseModal;
