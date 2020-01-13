import React from 'react';
import { Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';

const WorkoutListScreen = ({ navigation }) => {
    const onReturn = () => {
        navigation.goBack();
    };

    return (
        <View style={{ marginTop: 10 }}>
            <Text>Hello!</Text>
            <Button title="Return" onPress={onReturn} />
        </View>
    );
};

WorkoutListScreen.propTypes = {
    navigation: PropTypes.any,
};

export default WorkoutListScreen;
