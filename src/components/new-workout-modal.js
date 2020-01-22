import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Control from './titlecontrol';
// import Handle from './drawer-handle';

const NewWorkoutModal = ({ visible, onClose, onAddWorkout }) => {
    const [workoutTitle, setWorkoutTitle] = useState('');

    const handleAddButton = () => {
        onAddWorkout(workoutTitle)
    }

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onModalWillShow={() => setWorkoutTitle('')}
            onSubmitEditing={handleAddButton}
            onModalWillHide={Keyboard.dismiss}
            avoidKeyboard={true}
            backdropOpacity={0.3}>
            <View style={style.container}>
                <Control
                    titleLeft="Close"
                    onLeft={onClose}
                    titleRight="Add"
                    onRight={handleAddButton}
                />
                <View style={style.form}>
                    <TextInput
                        style={style.input}
                        autoFocus={true}
                        autoCorrect={false}
                        clearButtonMode={'while-editing'}
                        maxLength={36}
                        placeholder={'Workout Name'}
                        onChangeText={text => setWorkoutTitle(text)}
                        value={workoutTitle}
                    />
                </View>
            </View>
        </Modal>
    );
};

NewWorkoutModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onAddWorkout: PropTypes.func,
};

const style = StyleSheet.create({
    container: {
        height: 120,
        borderRadius: 20,
        marginLeft: -10,
        marginRight: -10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    handleBar: {
        width: 70,
        height: 8,
        borderRadius: 5,
        backgroundColor: '#dddddd',
        alignSelf: 'center',
    },
    form: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        fontSize: 18,
        paddingLeft: 10,
        height: 40,
    },
});

export default NewWorkoutModal;
