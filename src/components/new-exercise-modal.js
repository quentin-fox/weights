import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Keyboard, PanResponder } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Control from './titlecontrol';
import Stepper from './stepper';
import Handle from './drawer-handle';

const NewExerciseModal = ({ visible, onClose, onAddExercise }) => {
    const [exerciseType, setExerciseType] = useState('resistance');

    const [drawerPos, setDrawerPos] = useState(350);

    useEffect(() => setDrawerPos(350), [visible]);

    const [resistanceData, resistanceDispatch] = useReducer(
        resistanceReducer,
        initialResistanceData
    );
    const [timerData, timerDispatch] = useReducer(timerReducer, initialTimerData);

    const types = [
        { label: 'Resistance Exercise', value: 'resistance' },
        { label: 'Timer', value: 'timer' },
    ];

    const onSubmit = () => {
        switch (exerciseType) {
            case 'timer':
                onAddExercise(timerData, 'timer');
                onClose()
                break;
            case 'resistance':
                onAddExercise(resistanceData, 'resistance');
                onClose()
                break;
        }
    };

    const formType = () => {
        switch (exerciseType) {
            case 'timer':
                return (
                    <Stepper
                        count={timerData.duration}
                        min={0}
                        label="Duration"
                        countSuffix=" s"
                        onIncrement={() => timerDispatch({ type: 'increment', by: 5 })}
                        onDecrement={() => timerDispatch({ type: 'decrement', by: 5 })}
                    />
                );
            case 'resistance':
                return (
                    <>
                        <TextInput
                            style={style.input}
                            autoCorrect={false}
                            clearButtonMode={'while-editing'}
                            maxLength={50}
                            placeholder={'Exercise Name'}
                            onChangeText={text =>
                                resistanceDispatch({ type: 'setname', name: text })
                            }
                            value={resistanceData.name}
                        />
                        <Stepper
                            count={resistanceData.reps}
                            min={0}
                            max={25}
                            label="Reps"
                            onIncrement={() =>
                                resistanceDispatch({ type: 'increment', field: 'reps' })
                            }
                            onDecrement={() =>
                                resistanceDispatch({ type: 'decrement', field: 'reps' })
                            }
                        />
                        <Stepper
                            count={resistanceData.sets}
                            min={0}
                            max={25}
                            label="Sets"
                            onIncrement={() =>
                                resistanceDispatch({ type: 'increment', field: 'sets' })
                            }
                            onDecrement={() =>
                                resistanceDispatch({ type: 'decrement', field: 'sets' })
                            }
                        />
                        <Stepper
                            count={resistanceData.weight}
                            countSuffix=" lbs"
                            min={0}
                            label="Weight"
                            onIncrement={() =>
                                resistanceDispatch({ type: 'increment', field: 'weight', by: 5 })
                            }
                            onDecrement={() =>
                                resistanceDispatch({ type: 'decrement', field: 'weight', by: 5 })
                            }
                        />
                    </>
                );
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            avoidKeyboard={true}
            backdropOpacity={0.3}>
            <View style={{ ...style.container, marginTop: drawerPos }}>
                <Control titleLeft="Close" onLeft={onClose} titleRight="Add" onRight={onSubmit}>
                    <Handle setPos={setDrawerPos} closeDrawer={onClose} />
                </Control>
                <View style={style.form}>
                    <Picker
                        selectedValue={exerciseType}
                        style={style.picker}
                        itemStyle={{ height: 80 }}
                        onValueChange={itemValue => setExerciseType(itemValue)}>
                        {types.map((tp, index) => (
                            <Picker.Item key={index} label={tp.label} value={tp.value} />
                        ))}
                    </Picker>
                    {formType()}
                </View>
            </View>
        </Modal>
    );
};

const initialResistanceData = {
    name: '',
    sets: 0,
    weight: 0,
    reps: 0,
};

const initialTimerData = {
    duration: 0,
};

const resistanceReducer = (state, { type, name = '', field = null, by = 1 }) => {
    switch (type) {
        case 'increment':
            return {
                ...state,
                [field]: state[field] + by,
            };
        case 'decrement':
            return {
                ...state,
                [field]: state[field] - by,
            };
        case 'setname': {
            return {
                ...state,
                name: name,
            };
        }
        case 'reset':
            return initialResistanceData;
    }
};

const timerReducer = (state, { type, by = 1 }) => {
    switch (type) {
        case 'increment':
            return {
                duration: state.duration + by,
            };
        case 'decrement':
            return {
                duration: state.duration - by,
            };
        case 'reset':
            return initialTimerData;
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
        height: 1000,
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
    input: {
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        fontSize: 18,
        paddingLeft: 10,
        height: 40,
        marginBottom: 10,
    },
});

export default NewExerciseModal;
